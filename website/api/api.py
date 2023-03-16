import time
from flask import Flask, request, jsonify
from get_articles import *
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)