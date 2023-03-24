from __init__ import create_app
from flask_login import LoginManager, login_user, logout_user

app = create_app()
app.app_context().push()

from articles import article_api
from users import user_api
from investments import investment_api

# Register blueprints so we can add routes in other files
app.register_blueprint(investment_api)
app.register_blueprint(user_api)
app.register_blueprint(article_api)

# Configure login manager
login_manager = LoginManager() 
login_manager.init_app(app)

@login_manager.user_loader
def load_user(email):
    """Loads the user from the database"""
    query = f"SELECT * FROM Users WHERE email = {email}"
    result = send_query(query)
    if result == 0:
        return None
    return result

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the News API!\n"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
