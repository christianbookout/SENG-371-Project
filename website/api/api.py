import time
from flask import Flask
import yaml
import mysql.connector
import json

app = Flask(__name__)
##Configure db
# Load database credentials from db.yaml
db = yaml.load(open('db.yaml'), Loader=yaml.FullLoader)
# Connect to the database
db = mysql.connector.connect(
    host=db['mysql_host'], 
    user=db['mysql_user'], 
    password=db['mysql_password'], 
    database=db['mysql_db']
    )

@app.route('/time')
def get_current_time():
    return {'time': 10}