from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from get_articles import *
import mysql.connector
from utils import send_query
import time
from datetime import date

app = Flask(__name__)
cors = CORS(app)
app.config.from_object('config.Config')
app.config['CORS_HEADERS'] = 'Content-Type'

##Configure db
# Connect to the database
db = mysql.connector.connect(host=app.config['MYSQL_HOST'],
                             user=app.config['MYSQL_USER'],
                             password=app.config['MYSQL_PASSWORD'],
                             database=app.config['MYSQL_DB'],)

@app.route('/time')
def get_current_time():
    return {'time': 10}

@app.route('/createUser', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type'])
def create_user():
    """Creates a new user entry in the database"""

    name = request.json["fullname"]
    email = request.json.get("email")
    password = request.json.get("password")
    Date = date.today()

    query = "SELECT * FROM Users WHERE email= %s;"
    args = (email,)
    result = send_query(db, query, args)

    if len(result) > 0:
        investments = get_investments((result[0][0],))
        investments['balance'] = investments['balance'][0][0]
        print(investments)
        return investments, 200

    query = "INSERT INTO Users(fullname, email, password, balance, created_at) VALUES (%s, %s, %s, 25000, %s);"
    args = (name, email, password, Date)

    send_query(db, query, args)

    query = "SELECT * FROM Users WHERE email= %s;"
    args = (email,)
    result = send_query(db, query, args)

    # print(json.dumps(result))
    return result

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


# def get_investments():
#     return jsonify(send_query(db, "SELECT * FROM Investments", ())), 200

@app.route('/getInvestments', methods=['GET'])
def get_investments(ownerid, ticker="default"):
    """Returns all investments in the database for a given user"""
    if (ticker!="default"):
        query = f"SELECT ticker, quantity FROM Investments WHERE owner='{ownerid}' AND ticker='{ticker}';"
        args = {ownerid, ticker}
    else :
        query = f"SELECT ticker, quantity FROM Investments WHERE owner='{ownerid}';"
        args="default"
    result = send_query(db, query, args)
    
    get_balance = "SELECT balance FROM Users WHERE userid = %s;"
    updated_balance = send_query(db, get_balance, ownerid)
    response = {"stocks": result, "balance": updated_balance}
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
