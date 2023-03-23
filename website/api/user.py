import yaml
from flask import Flask
from flask_login import LoginManager, login_user, logout_user
import mysql.connector
import json
import time

# Load database credentials from db.yaml
db = yaml.load(open('db.yaml'), Loader=yaml.FullLoader)
# Connect to the database
db = mysql.connector.connect(
    host=db['mysql_host'], 
    user=db['mysql_user'], 
    password=db['mysql_password'], 
    database=db['mysql_db']
    )

def create_user(request):
    name = request.json.get("fullname")
    email = request.json['email'] 
    password = request.json['password']
    user = get_user(email)
    if(user is not None): 
        return {"status_code": 401}
    else:
        db.reconnect()
        cur = db.cursor()
        query = f"INSERT INTO Users(fullname, email, password, balance) VALUES ('{name}', '{email}', '{password}', 25000);"
        cur.execute(query)
        db.commit()
        return user

def login(request):
    db.reconnect()
    cur = db.cursor()

    email = request.json['email']
    password = request.json['password']
    query = f"SELECT * FROM Users WHERE email = '{email}' AND password = '{password}';"
    cur.execute(query)
    result = cur.fetchone()
    if len(result) == 0:
        return {"status_code": 401}
    else:
        return result
    
def get_user(email):
    db.reconnect()
    cur = db.cursor()
    query = f"SELECT * FROM Users WHERE email='{email}';"
    cur.execute(query)
    result = cur.fetchall()
    db.commit()
    print("result: ", result)
    return result