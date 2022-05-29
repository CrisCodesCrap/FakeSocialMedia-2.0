from sqlalchemy import ARRAY, Boolean, Column, DateTime, ForeignKey,String ,Integer, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database
from settings import settings

def engine_init(settings):
    url = f'postgresql+psycopg2://{settings["username"]}:{settings["password"]}@{settings["host"]}:{settings["port"]}/{settings["db"]}'
    if not database_exists(url):
        create_database(url)
    engine = create_engine(url,pool_size=50,echo=False)
    return engine

engine = engine_init(settings)

session = sessionmaker(autocommit=False, autoflush=False, bind=engine)()

Base = declarative_base()

class User(Base):
    __tablename__ = 'userlist'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    username = Column(String(30),unique=True)
    password = Column(String(64))
    timejoined = Column(DateTime,index=True)
    messagesSent = Column(Integer(),default=0)
    lastSeen = Column(DateTime,index=True)
    online = Column(Boolean)

class AccountSettings(Base):
    __tablename__ = 'accountPersonalisations'
    account = Column(Integer, ForeignKey('userlist.id'), primary_key=True)
    description = Column(String(256))
    timeChanged = Column(DateTime)

class MessageList(Base):
    __tablename__ = 'messages'
    id = Column(Integer(),primary_key=True)
    content = Column(String(512))
    timesent = Column(DateTime)
    sender = Column(Integer)
    room = Column(Integer)
    
class MessageListGroups(Base):
    __tablename__ = 'messagesGroups'
    id = Column(Integer(),primary_key=True)
    content = Column(String(512))
    timesent = Column(DateTime)
    sender = Column(Integer)
    room = Column(Integer)
    isCommand = Column(Boolean)

class Friendship(Base):
    __tablename__ = 'friendships'
    id = Column(Integer,primary_key=True)
    user1 = Column(Integer)
    user2 = Column(Integer, ForeignKey('userlist.id'))
    friends_since = Column(DateTime)
    ended = Column(Boolean)
    lastMessage = Column(DateTime)

class FriendRequest(Base):
    __tablename__ = 'friendRequests'
    id = Column(Integer, primary_key=True)
    user1 = Column(Integer)
    user2 = Column(Integer, ForeignKey('userlist.id'))
    timesent = Column(DateTime)
    accepted = Column(Boolean)
    ended = Column(Boolean)

class Groups(Base):
    __tablename__ = 'groups'
    name = Column(String(30))
    creator = Column(Integer, ForeignKey('userlist.id'))
    admin = Column(String)
    id = Column(Integer, primary_key=True)
    participants = Column(ARRAY(String))
    timecreated = Column(DateTime)
    lastMessage = Column(DateTime)

Base.metadata.create_all(bind=engine)