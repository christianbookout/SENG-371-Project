import mysql.connector
import json 
import time
from get_user import get_user
from utils import *
from api import db, app


@app.route('/login', methods=['POST'])
def login(request):
    """Logs in the user by checking the database for the user's email and password"""

    name = request.json.get("fullname")
    email = request.json.get["email"]
    password = request.json.get["password"]
    query = f"SELECT * FROM Users WHERE email = '{email}' AND password = '{password}';"
    args = (email, password)
    result = send_query(db, query, args)
    if len(result) == 0:
        return {"status_code": 401}
    else:
        return get_user(email)