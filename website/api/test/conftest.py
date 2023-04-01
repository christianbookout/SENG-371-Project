from flask import Flask
import pytest

app = Flask(__name__)
app.config.from_object('api.config.Config')
with app.app_context():
    import db
    db.init_app(app)
    db.get_db()
app.app_context().push()

@pytest.fixture()
def client():
    client = app.test_client()
    yield client