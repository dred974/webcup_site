from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(100))
    posts = relationship("Post", back_populates="owner")

class Post(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    content = Column(String(500))
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="posts")
    emoji_heart = Column(Integer, default=0)
    emoji_broken_heart = Column(Integer, default=0)
    emoji_sad = Column(Integer, default=0)
    emoji_cry = Column(Integer, default=0)
    emoji_angry = Column(Integer, default=0)
    emoji_disappointed = Column(Integer, default=0)


