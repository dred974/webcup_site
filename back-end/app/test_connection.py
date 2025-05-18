# test_connection.py

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Charge le .env situé au même niveau que ce script
from pathlib import Path
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Affiche pour debug
print("DB_PORT=", os.getenv("DB_PORT"))
print("DB_HOST=", os.getenv("DB_HOST"))

# Construit l’URL
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
print("DATABASE_URL=", DATABASE_URL)

# Teste la connexion
engine = create_engine(DATABASE_URL)
try:
    with engine.connect() as conn:
        print("Connexion réussie !")
except Exception as e:
    print("Erreur :", e)
