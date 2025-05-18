from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Post
from app.schemas import PostCreate, PostResponse, EmojiReaction
from typing import List

router = APIRouter(prefix="/posts")

@router.post("/{user_id}/")
def add_post(user_id: int, post: PostCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_post = Post(title=post.title, content=post.content, owner=user)
    db.add(new_post)
    db.commit()
    return {"message": "Post added"}

@router.get("/all", response_model=List[PostResponse])
def get_all_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).all()
    return [
        PostResponse(
            user_id=post.user_id,
            author=post.owner.name,
            title=post.title,
            content=post.content,
            emojis={
                "❤️": post.emoji_heart,
                "💔": post.emoji_broken_heart,
                "😢": post.emoji_sad,
                "😭": post.emoji_cry,
                "😤": post.emoji_angry,
                "😞": post.emoji_disappointed
            }
        ) for post in posts
    ]

@router.post("/{post_id}/emoji")
def add_emoji(post_id: int, emoji: EmojiReaction, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    emoji_map = {
        "❤️": "emoji_heart",
        "💔": "emoji_broken_heart",
        "😢": "emoji_sad",
        "😭": "emoji_cry",
        "😤": "emoji_angry",
        "😞": "emoji_disappointed"
    }

    if emoji.emoji not in emoji_map:
        raise HTTPException(status_code=400, detail="Invalid emoji")

    setattr(post, emoji_map[emoji.emoji], getattr(post, emoji_map[emoji.emoji]) + 1)
    db.commit()
    return {"message": "Emoji added"}
