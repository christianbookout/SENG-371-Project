import yaml
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
    db.reconnect()
    cur = db.cursor()

    name = request.json['fullname']
    email = request.json['email']
    password = request.json['password']

    query = f"INSERT INTO Users(fullname, email, password, balance) VALUES ('{name}', '{email}', '{password}', 25000);"
    cur.execute(query)
    db.commit()
    
    return {"status_code": 200}