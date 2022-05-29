from pydantic import BaseModel
from typing import List

class User(BaseModel):
    username:str
    password:str
class RegisterData(BaseModel):
    email:str
    username:str
    password:str
class Message(BaseModel):
    content:str
    sender:str
    room:int
    type:bool
class FrienRequestAnswer(BaseModel):
    username:str
    answer:bool
    user2:str
class Description(BaseModel):
    user:str
class FriendRequestRemove(BaseModel):
    usr_from:str
    usr_to:str
class FriendRequest(BaseModel):
    usr_from:str
    usr_to:str
    areFriends:bool
    method:bool
class NameFragment(BaseModel):
    username_fragment:str
class RoomSend(BaseModel):
    room:int
    isgroup:bool
class FriendCheck(BaseModel):
    current_user:str
    username:str
class Group(BaseModel):
    groupName: str
    userCreator: str
    groupMembers: List[str]
class GetGroups(BaseModel):
    username:str
class UnFriend(BaseModel):
    username:str
    friend:str
class DeleteGroup(BaseModel):
    username:str
    groupName:str
class RemoveUserFromGroup(BaseModel):
    username:str
    id:int
    remove: List[str]
class AddUsersToGroup(BaseModel):
    username:str
    room:int
    usersToAdd:List[str]
class LeaveGroup(BaseModel):
    username:str
    room:int
    isAdmin:bool
class DeleteGroup(BaseModel):
    username:str
    room:int
    isCreator:bool