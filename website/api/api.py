import time
from flask import Flask, request, jsonify
from get_articles import *

app = Flask(__name__)

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