import time
from flask import Flask, request, jsonify
from get_articles import *
import yaml
import mysql.connector
import json
from flask_login import LoginManager, login_user, logout_user
from user import *

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

# Configure login manager
login_manager = LoginManager() 
login_manager.init_app(app)

def send_query(query):
    """Sends a query to the database and returns the result as a list of tuples"""
    db.reconnect()
    cur = db.cursor()
    try:
        cur.execute(query)
        result = cur.fetchall()
        return list(result)
    except:
        return 0
    
@login_manager.user_loader
def load_user(email):
    """Loads the user from the database"""
    query = f"SELECT * FROM Users WHERE email = {email}"
    result = send_query(query)
    if result == 0:
        return None
    return result

@app.route('/time')
def get_current_time():
    return {'time': 10}

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the News API!\n"

@app.route('/getArticles', methods=['GET'])
def get_articles():
    num_articles = request.args.get('number')
    reader = ArticleReader("./articles.json")
    if num_articles is None:
        return jsonify(reader.article_list), 200
    
    if not num_articles.isnumeric():
        return "Number must be an integer", 400
    
    return jsonify(reader.get_random_articles(int(num_articles))), 200

@app.route('/createUser', methods=['POST']) 
def db_create_user(): 
    return create_user(request)

@app.route('/login', methods=['POST']) 
def db_login(): 
    return login(request)

@app.route('/logout')
def logout(): 
    logout_user()
    return home()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
