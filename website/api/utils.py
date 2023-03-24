import time
from get_articles import *
import yaml
import mysql.connector
import json

def send_query(db, query, args="default"):
    """Sends a query to the database and returns the result as a list of tuples"""
    db.reconnect()
    cur = db.cursor()
    try:
        if(args == "default"):
            cur.execute(query)
        else:
            cur.execute(query, args)
        if(query.find("INSERT")!= -1 or query.find("UPDATE") != -1):
            db.commit()
            return {"status_code": 200}
        elif(query.find("SELECT") != -1):
            result = cur.fetchall()
            return list(result)
    except Exception as e: print(e)
