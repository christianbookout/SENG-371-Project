<<<<<<< HEAD
from __init__ import create_app
from flask_cors import CORS

app = create_app()
cors = CORS(app)
=======
from flask import Flask

app = Flask(__name__)
app.config.from_object('config.Config')
with app.app_context():
    import db
    db.init_app(app)
    db.get_db()
>>>>>>> main
app.app_context().push()

from flask_login import LoginManager
from utils import send_query
from articles import article_api
from users import user_api
from investments import investment_api

# Register blueprints so we can add routes in other files
app.register_blueprint(investment_api)
app.register_blueprint(user_api)
app.register_blueprint(article_api)

# Configure login manager
login_manager = LoginManager(app) 

@login_manager.user_loader
def load_user(email):
    """Loads the user from the database"""
    query = "SELECT * FROM Users WHERE email = %s"
    result = send_query(query, [email])
    if result == 0:
        return None
    return result

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the News API!\n"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
