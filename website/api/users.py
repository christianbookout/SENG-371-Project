import datetime
from utils import *
from flask import Blueprint, request

user_api = Blueprint('user_api', __name__)

@user_api.route('/createUser', methods=['POST'])
def create_user():
    """Creates a new user entry in the database"""

    name = request.json.get("fullname")
    email = request.json.get("email")
    password = request.json.get("password")
    balance = request.json.get("balance")
    date = datetime.datetime.now()
    if get_user(email=email) != []:
        return "User already exists", 400
    query = "INSERT INTO Users(fullname, email, password, balance, created_at) VALUES (%s, %s, %s, %s, %s);"
    args = (name, email, password, balance, date)
    send_query(query, args)
    return {
        "username": name,
        "email": email,
        "balance": balance,
        "stocks": [],
    }, 200

@user_api.route('/updateBalance', methods=['PATCH'])
def update_balance():
    """Updates the balance of a user in the database"""
    
    balance = request.json.get("balance")
    email = request.json.get("email")
    query = "UPDATE Users SET balance = %s WHERE email = %s;"
    args = (balance, email)
    send_query(query, args)
    return "", 200

def get_user(name = None, email = None):
    '''Returns a user from the database by either name or email'''
    if name is not None:
        query = "SELECT * FROM Users WHERE fullname = %s;"
        args = [name]
    elif email is not None:
        query = "SELECT * FROM Users WHERE email = %s;"
        args = [email]
    result = send_query(query, args)
    return result
