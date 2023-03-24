import yaml
import mysql.connector
import json
import time
from utils import *
from api import db, app
from get_user import get_user


@app.route('/createUser', methods=['POST']) #check if an account already exists for the given email
def create_user(request):
    """Creates a new user entry in the database"""

    name = request.json.get("fullname")
    email = request.json.get("email")
    password = request.json.get("password")
    date = date.today()
    if (get_user(email=email) != None):
        return "User already exists", 400
    query = "INSERT INTO Users(fullname, email, password, balance, created_at) VALUES (%s, %s, %s 25000, %s);"
    args = (name, email, password, date)
    result = send_query(db, query, args)
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