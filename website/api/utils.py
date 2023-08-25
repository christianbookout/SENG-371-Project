from db import get_db

db = get_db()

def send_query(query, args):
    db.reconnect()
    cur = db.cursor()
    cur.execute(query, args)
    result = cur.fetchall()
    db.commit()
    return list(result)
