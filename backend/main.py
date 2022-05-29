from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from database import User
from database import session as db,User,AccountSettings,MessageList,MessageListGroups,Friendship,FriendRequest,Groups
from datetime import datetime
from operator import and_, or_
from schemes import RoomSend, RegisterData,Description ,Message,FrienRequestAnswer,FriendRequestRemove,FriendRequest,NameFragment,FriendCheck,Group,GetGroups,UnFriend,DeleteGroup,RemoveUserFromGroup,AddUsersToGroup,LeaveGroup
from LoginManager import LoginManager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/users/{user}/messages/get')
async def GetMessage(room:RoomSend):
    if room.isgroup:
        msgs = db.execute('SELECT * FROM messagesGroups WHERE room = :roomId',{'roomId':room.room})
        msg_array = []
        for msg in msgs:
            msg_array.append(msg)
        return{"messages":msg_array}
    elif not room.isgroup:
        msgs = db.execute('SELECT * FROM messages WHERE room = :roomId',{'roomId':room.room})
        msg_array = []
        for msg in msgs:
            msg_array.append(msg)
            return{"messages":msg_array}
    return{'code':'error'}
@app.post('/users/{user}/messages/send')
async def SendMessage(message:Message):
    time_sent = datetime.now()
    if message.type:
        append_msg = MessageListGroups(content=message.content,timesent=time_sent,sender=message.sender,room=message.room,isCommand=False)
    elif message.type is False:
        append_msg = MessageList(content=message.content,timesent=time_sent,sender=message.sender,room=message.room)
    user = LoginManager.getUser(message.sender)
    db.execute('UPDATE userlist SET messages_sent = :msgs WHERE username = :val',{'val':message.sender,'msgs':user.messages_sent+1})
    db.add(append_msg)
    db.commit()
    if message.type:
        messages = db.query(MessageListGroups).filter(MessageListGroups.timesent == time_sent).first()
        db.execute('UPDATE groups SET lastMessage = :timevar WHERE id = :room',{'timevar':time_sent,'room':message.room})
    elif message.type is False:
        messages = db.query(MessageList).filter(MessageList.timesent == time_sent).first()
        db.execute('UPDATE friendships SET lastMessage = :timevar WHERE id = :room',{'timevar':time_sent,'room':message.room})
    db.commit()
    if messages is not None:
        return{'id':messages.id, 'content': message.content,'timesent':time_sent,'sender': messages.sender,'room': messages.room,'isCommand':False,'type':message.type}
@app.post('/users/{user}/query')
async def QueryUsers(username_fragment:NameFragment):
    try:
        fragment_try = db.execute('SELECT * FROM userlist WHERE username like :userfragment',{'userfragment':f'{username_fragment.username_fragment}%'})
        user_fragment_array = []
        for row in fragment_try:
            user_fragment_array.append(row['username'])
    except Exception as e:
        print(e)
        db.rollback()
    finally:
        return{"found_users":user_fragment_array}
    
@app.post('/users/{user}/login')
async def LoginUser(userdata:User):
    user = LoginManager.getUser(userdata.username)
    if user is not False:
        if LoginManager.VerifyPassword(userdata.password,user.password):
            user.last_seen = datetime.now()
            #Implement login logic here:
            return{'code':'success'}
    return{'code':'Wrong credentials'}
@app.post('/users/{user}/profile/get')
async def userProfileGet(username:str):
    user = LoginManager.getUser(username)
    if user is not False:
        return {'username':user.username}
    return{'username':'not_found'}
@app.post('/users/{username}/profile/description/set')
async def UserProfileDescriptionSet(data:Description):
    user = LoginManager.getUser(data.username)
    if user is not False:
        db.execute('UPDATE account_personalisations SET description = :descript WHERE account = :account',{'account':user.username,'descript':data.description})
        db.commit()
        return {'status':'success','username':user.username,'description':data.description}
    return{'status':'error'}
@app.get('/users/{user}/description/get')
async def DescriptionGet(user:str):
    user = LoginManager.getUser(user)
    if user is not False:
        description = db.query(AccountSettings).filter(AccountSettings.account == user.id).first()
        if description is not None:
            return{'status':'success','description':description.description}
        return{'status':'success','description':''}
    return{'status':'no such user..'}
@app.post("/users/create")
async def SignUp(data:RegisterData):
    if LoginManager.CheckExistingUserData(data.username,data.email):
        LoginManager.NewUserAssignment(data.email,data.username,data.password)
        return{'code':'success'}
    return{'code':'error'}
@app.post('/users/{user}/status/get/online')
async def IsOnline(user):
    user = LoginManager.getUser(user)
    if user is not False:
        db.execute('UPDATE userlist SET last_seen = :timer, online = :onlinevar WHERE username = :val',{'val':user.username,'timer':datetime.now(),'onlinevar':True})
        db.commit()
        return{}
@app.post('/')
async def CheckOnlineStatus(data:FriendCheck):
    user = LoginManager.getUser(data.username)
    arefriends = db.execute('SELECT * FROM friendships WHERE user1 = :usr1 AND user2 = :usr2 OR user2 = :usr1 AND user1 = :usr2',{'usr1':data.username,'usr2':data.current_user})
    friends = False
    requestPresent = False
    room = 0
    isFromMe = False
    present = db.query(FriendRequest).filter(or_(and_(FriendRequest.user1 == data.username, FriendRequest.user2 == data.current_user),and_(FriendRequest.user2 == data.username, FriendRequest.user1 == data.current_user))).first()
    if present is not None:
        requestPresent = True
        if present.user1 == data.current_user:
            isFromMe = True
    for friend in arefriends:
        if friend.user1 == data.current_user and friend.ended == False or  friend.user2 == data.current_user and friend.ended == False:
            room = friend.id
            friends = True
    if user is not False:
        return{'isOnline':user.online,'lastSeen':user.last_seen,'areFriends':friends,'isPresent':requestPresent,'isFromMe':isFromMe,'room':room}
    return{'code':'error'}
@app.post('/users/{user}/status/get/seen')
async def LastSeen(user):
    user = LoginManager.getUser(user)
    if user is not False:
        return{'last_seen':user.last_seen}
@app.post('/users/{user}/status/set/offline')
async def SetOffline(user): 
    db.execute('UPDATE userlist SET last_seen = :timer, online = :onlinevar WHERE username = :val',{'val':user,'timer':datetime.now(),'onlinevar':False})
    db.commit()
@app.post('/users/{user}/friends/request/send')
async def SendFriendRequest(data:FriendRequest): 
    if data.areFriends == False:
        if data.method == True:  
            friend_req = FriendRequest(user1 = data.usr_from,user2 = data.usr_to,timesent=datetime.now(),accepted=False,ended=False)
            db.add(friend_req)
            db.commit()
            return{'areFriends':True,'isPresent':True}
        elif data.method == False:
            db.execute('DELETE FROM friend_requests WHERE user1 = :usr1 AND user2 = :usr2 OR user2 = :usr1 AND user1 = :usr2',{'usr1':data.usr_from,'usr2':data.usr_to})
            db.commit()
            return{'areFriends':False,'isPresent':False}
        elif data.areFriends == True:
            if data.method == True:
                db.execute('UPDATE friendships SET ended = :val WHERE user1 = :usr1 AND user2 = :usr2 OR user2 = :usr1 AND user1 = :usr2',{'usr1':data.usr_from,'usr2':data.usr_to,'val':True})
                db.commit()
                return{'areFriends':False,'isPresent':False}
    return {'code':'error'}
@app.post('/users/{user}/friends/request/get')
async def GetFriendRequest(user):
    found_friend_requests = db.execute('SELECT * FROM friend_requests WHERE ended = :ended AND user2 = :user',{'user':user,'ended':False})
    friend_request_array = []
    for friend_request in found_friend_requests:
        friend_request_array.append(friend_request)
    return{'friend_requests':friend_request_array}
@app.post('/users/{user}/friends/request/answer')
async def AnswerFriendRequest(data:FrienRequestAnswer):
    db.execute('UPDATE friend_requests SET accepted = :answer, ended = :ended WHERE user1 =:usr1 AND user2 = :usr2 OR user1 =:usr2 AND user2 = :usr1',{'usr1':data.user,'usr2':data.user2,'answer':data.answer,'ended':True})
    if data.answer is True:
        werefriends = db.query(Friendship).filter(or_(and_(Friendship.user1 == data.user, Friendship.user2 == data.user2),(and_(Friendship.user2 == data.user, Friendship.user1 == data.user2)))).first()
        if werefriends is None:
            new_friends = Friendship(user1=data.user,user2=data.user2,friends_since=datetime.now(),ended=False)
            db.add(new_friends)
        else:
            db.execute('UPDATE friendships SET ended = :ended AND friends_since = :since WHERE user1 = :user1 AND user2 = :user2 OR user2 = :user1 AND user1 = :user2',{'user1':data.user,'user2':data.user2,'ended':False,'since':datetime.now()})
    db.execute('DELETE FROM friend_requests WHERE user1 = :usr1 AND user2 = :usr2 OR user2 = :usr1 AND user1 = :usr2',{'usr1':data.user,'usr2':data.user2})
    db.commit()
    return{}
@app.post('/users/{user}/friendlist/get')
async def GetFriendlist(user:str):
    users_array = []
    users = db.execute('SELECT * FROM Friendships WHERE user1 = :USR OR user2 = :USR',{'USR':user})
    for user in users:
        if not user.ended:
            friend = ''
            if user.user1 == user:
                friend = db.query(User).filter(User.username == user.user2).first()
            else:
                friend = db.query(User).filter(User.username == user.user1).first()
            friendship = {'id':user.id,'friend':friend.username,'since':user.friends_since,'last_seen':friend.last_seen,'isonline':friend.online,'lastMessage':user.lastMessage}
            users_array.append(friendship)
        else:
            pass
    return{'friends':users_array}
#Groups
@app.post('/users/{user}/groups/create')
async def createGroup(data:Group):
    user = LoginManager.getUser(data.userCreator)
    if user is not False:
        new_group = Groups(name=data.groupName,admin=data.userCreator,creator=data.userCreator,participants=data.groupMembers,timecreated=datetime.now())
        db.add(new_group)
        db.commit()
        return{'code':'success'}
    return{'code':'error'}
@app.post('/users/{user}/groups/get')
async def GetGroupsFor(data:GetGroups):
    user = LoginManager.getUser(data.username)
    if user is not None:
        groups = db.query(Groups).filter(Groups.participants.contains(data.username))
        groups_array = []
        for group in groups:
            groups_array.append(group)
            return{'groups':groups_array}
    return{'code':'error'}
@app.post('/users/{user}/groups/{group}/delete')
async def DeleteGroupFor(data:DeleteGroup):
    user = LoginManager.getUser(data.username)
    if user is not False:
        db.execute('DELETE FROM groups WHERE id = :id',{'id':data.room})
        db.execute('DELETE FROM messagesGroups WHERE room = :room',{'room':data.room})
        db.commit()
        return{'code':'success'}
    return{'code':'error'}

@app.post('/users/{user}/groups/{group}/add')
async def AddParticipantToGroup(data:AddUsersToGroup):
    if data.usersToAdd is not None:
        user = LoginManager.getUser(data.username)
        if user is not False:
            group = db.query(Groups).filter(Groups.id == data.room).first()
            participants = group.participants 
            time_sent = datetime.now()
            for user in data.usersToAdd:
                if user not in group.participants:
                    participants.append(user)
            string = ', '.join(data.usersToAdd)
            appendCommandMsg = MessageListGroups(content=f'{data.username} added {string} to the chat',timesent=time_sent,sender=data.username,room=data.room,isCommand=True)
            db.add(appendCommandMsg)
            db.execute('UPDATE groups SET participants = :participants WHERE id = :id',{'id':data.room,'participants':participants})
            db.commit()
            return{'id':appendCommandMsg.id, 'content': appendCommandMsg.content,'timesent':time_sent,'sender': appendCommandMsg.sender,'room': appendCommandMsg.room,'type':True,'isCommand':True}
    return{'code':'error'}
@app.post('/users/{user}/groups/{group}/leave')
async def LeaveGroupFor(data:LeaveGroup):
    time_sent = datetime.now()
    user = LoginManager.getUser(data.username)
    if user is not False:
        group = db.query(Groups).filter(Groups.id == data.room).first()
        participants = group.participants
        if len(participants) == 1:
            db.execute('DELETE FROM groups WHERE id = :id',{'id':data.room})
            db.execute('DELETE FROM messagesGroups WHERE room = :room',{'room':data.room})
            db.commit()
            return{'code':'success'}
        newOwner = str(participants[0])
        if data.isAdmin:
            participants.remove(data.username)  
            db.execute('UPDATE groups SET admin = :admin WHERE id = :id',{'id':data.room,'admin':newOwner,'participants':participants})
            db.execute('UPDATE groups SET participants = :participants WHERE id = :id',{'id':data.room,'participants':participants})
            appendCommandMsg = MessageListGroups(content=f'{data.username} left the chat, the new admin is {participants[0]}, from',timesent=time_sent,sender=data.username,room=data.room,isCommand=True)
            db.add(appendCommandMsg)
            db.commit()
            return{'id':appendCommandMsg.id, 'content': appendCommandMsg.content,'timesent':time_sent,'sender': appendCommandMsg.sender,'room': appendCommandMsg.room,'type':True,'isCommand':True}
        else:
            participants.remove(data.username)
            db.execute('UPDATE groups SET participants = :participants WHERE id = :id',{'id':data.room,'participants':participants})
            appendCommandMsg = MessageListGroups(content=f'{data.username} left the chat',timesent=time_sent,sender=data.username,room=data.room,isCommand=True)
            db.add(appendCommandMsg)
            db.commit() 
            return{'id':appendCommandMsg.id, 'content': appendCommandMsg.content,'timesent':time_sent,'sender': appendCommandMsg.sender,'room': appendCommandMsg.room,'type':True,'isCommand':True}
    return{'code':'error'}
@app.post('/users/{user}/groups/{group}/kick')
async def KickUsers(data:RemoveUserFromGroup):
    user = LoginManager.getUser(data.username)
    if user is not False:
        time_sent = datetime.now()
        group = db.query(Groups).filter(Groups.id == data.id).first()
        participants = group.participants
        for user in data.remove:
            if user in participants:
                participants.remove(user)
                appendCommandMsg = MessageListGroups(content=f'{data.username} removed {user} from the chat',timesent=time_sent,sender=data.username,room=data.id,isCommand=True)
                db.add(appendCommandMsg)
                db.commit()
        if group.participants is not None:
            db.execute('UPDATE groups SET participants = :participants WHERE id = :name',{'participants':participants,'name':data.id})
            db.commit()
            return{'id':appendCommandMsg.id, 'content': appendCommandMsg.content,'timesent':time_sent,'sender': appendCommandMsg.sender,'room': appendCommandMsg.room,'type':True}
    return{'code':'error'}

@app.post('/users/{user}/friends/{friend}/remove')
async def UnfriendUser(data:UnFriend):
    user = LoginManager.getUser(data.username)
    if user is not False:
        db.execute('UPDATE friendships SET ended = :ended WHERE user1 = :user1 AND user2 = :user2 OR user2 = :user1 AND user1 = :user2',{'user1':data.username,'user2':data.friend,'ended':True})
        db.commit()
        return{'code':'success'}
    return{'code':'error'}
if __name__ == "__main__":
    app.run(debug=True)