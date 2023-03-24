import yaml
import mysql.connector
import json
import time
from get_user import *
from utils import *
from api import db, app


@app.route('/createUser', methods=['POST'])
def create_user(request):
    """Creates a new user entry in the database"""

    name = request.json.get("fullname")
    email = request.json.get("email")
    password = request.json.get("password")
    date = date.today()
    query = "INSERT INTO Users(fullname, email, password, balance, created_at) VALUES (%s, %s, %s 25000, %s);"
    args = (name, email, password, date)
    send_query(db, query, args)
    result = get_user(email)
    return result

@app.route('/updateBalance', methods=['PATCH'])
def update_balance(request):
    """Updates the balance of a user in the database"""
    
    balance = request.json.get("balance")
    email = request.json.get("email")
    query = "UPDATE Users SET balance = %s WHERE email = %s"
    args = (balance, email)
    send_query(db, query, args)
    return "", 200