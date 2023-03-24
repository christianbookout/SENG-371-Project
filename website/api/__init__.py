from flask import Flask

def create_app():
    
    app = Flask(__name__)
    app.config.from_object('config.Config')
    with app.app_context():
        import db
        db.init_app(app)
        db.get_db()

    return app