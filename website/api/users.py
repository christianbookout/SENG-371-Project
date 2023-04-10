import datetime
from utils import *
from flask import Blueprint, request

from investments import get_investments

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

@user_api.route('/login', methods=['POST'])
def login():
    db.reconnect()
    cur = db.cursor()

    email = request.json['email']
    password = request.json['password']
    query = "SELECT * FROM Users WHERE email = %s;"
    cur.execute(query, [email])
    result = cur.fetchone()
    if result is None or len(result) == 0:
        return "User doesn't exist", 401
    
    stocks = get_investments(result[2])
    return {
        "username": result[1],
        "email": email,
        "balance": result[4],
        "stocks": stocks,
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

@user_api.route('/getHistory', methods=['GET'])
def get_history():
    """Returns the history of a user"""
    email = request.args.get("email")
    query = "SELECT * FROM Transaction_history WHERE purchaser = %s;"
    args = [email]
    result = send_query(query, args)
    pretty_result = list(map(lambda x: {
        "purchaser": x[1],
        "ticker": x[2],
        "quantity": x[3],
        "price": x[4],
        "date": x[5],
        "buySell": x[6],
    }, result)) 
    return pretty_result, 200