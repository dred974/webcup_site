# passenger_wsgi.py
import sys
import os

# Assure-toi que le chemin vers ton app est dans sys.path
sys.path.insert(0, os.path.dirname(__file__))

from app.main import app as application  # "application" est obligatoire
