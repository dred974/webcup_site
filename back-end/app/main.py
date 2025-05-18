from fastapi import FastAPI
from app.database import Base, engine
from app.routes import users, posts
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:4200",
    # tu peux aussi mettre "*" pour tout autoriser (pas recommandé en prod)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Origines autorisées
    allow_credentials=True,
    allow_methods=["*"],            # Méthodes HTTP autorisées (GET, POST, PUT, OPTIONS, ...)
    allow_headers=["*"],            # Headers autorisés
)


app.include_router(users.router)
app.include_router(posts.router)
