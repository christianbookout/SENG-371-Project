import time
from get_articles import *
import yaml
import mysql.connector
import json

# Load database credentials from db.yaml
db = yaml.load(open('db.yaml'), Loader=yaml.FullLoader)
# Connect to the database
db = mysql.connector.connect(
    host=db['mysql_host'], 
    user=db['mysql_user'], 
    password=db['mysql_password'], 
    database=db['mysql_db']
    )

def send_query(query, args):
    """Sends a query to the database and returns the result as a list of tuples"""
    db.reconnect()
    cur = db.cursor()
    try:
        cur.execute(query, args)
        if(query.search("INSERT")!= -1 or query.search("UPDATE") != -1):
            return {"status_code": 200}
        elif(query.search("SELECT") != -1):
            result = cur.fetchall()
            return list(result)
    except:
        return 0
