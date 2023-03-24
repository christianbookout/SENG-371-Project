import yaml
import mysql.connector
import json
import time
from utils import *
from api import db, app


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
