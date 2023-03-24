import click
from flask import current_app, g
import mysql.connector

def close_db(a):
    db = g.pop('db', None)

    if db is not None:
        db.close()

@click.command('init-db')
def init_db():
    get_db()

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db)

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
                            host=current_app.config['MYSQL_HOST'],
                            user=current_app.config['MYSQL_USER'],
                            password=current_app.config['MYSQL_PASSWORD'],
                            database=current_app.config['MYSQL_DB'],
                            )
    return g.db