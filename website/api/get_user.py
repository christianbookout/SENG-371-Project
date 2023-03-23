import yaml
import mysql.connector
import json
import time
from api import *

# Load database credentials from db.yaml
db = yaml.load(open('db.yaml'), Loader=yaml.FullLoader)
# Connect to the database
db = mysql.connector.connect(
    host=db['mysql_host'], 
    user=db['mysql_user'], 
    password=db['mysql_password'], 
    database=db['mysql_db']
    )

def get_user(email):
    db.reconnect()
    cur = db.cursor()
    if (email!="default"):
        query = f"SELECT * FROM Users WHERE email='{email}';"
    else: 
        return {"status_code": 401}
    cur.execute(query)
    result = cur.fetchone()
    print("result: ", result)
    return result