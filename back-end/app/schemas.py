from pydantic import BaseModel
from typing import List

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    user_id: int
    author: str
    title: str
    content: str
    emojis: dict

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    posts: List[PostCreate] = []

class PasswordUpdate(BaseModel):
    password: str

class EmojiReaction(BaseModel):
    emoji: str

class UserLogin(BaseModel):
    email: str
    password: str
