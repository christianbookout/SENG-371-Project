from __init__ import create_app

app = create_app()
app.app_context().push()

from articles import article_api
from users import user_api
from investments import investment_api

# Register blueprints so we can add routes in other files
app.register_blueprint(investment_api)
app.register_blueprint(user_api)
app.register_blueprint(article_api)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the News API!\n"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
