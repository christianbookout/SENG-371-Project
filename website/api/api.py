from flask import Flask, request, jsonify
from get_articles import *
import mysql.connector
from utils import send_query

app = Flask(__name__)
app.config.from_object('config.Config')

##Configure db
# Connect to the database
db = mysql.connector.connect(host=app.config['MYSQL_HOST'],
                             user=app.config['MYSQL_USER'],
                             password=app.config['MYSQL_PASSWORD'],
                             database=app.config['MYSQL_DB'],)

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

@app.route('/getInvestments', methods=['GET'])
def get_investments():
    return jsonify(send_query(db, "SELECT * FROM Investments", ())), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
