import time
import db
import json
from datetime import date
from datetime import datetime
from flask import Flask, jsonify
import pymysql.cursors

app = Flask(__name__)

# mysql.connection.commit() do if inserting into database, or posting

# Configure db
connection = pymysql.connect(host=db.mysql_host,
                            user=db.mysql_user,
                            password=db.mysql_password,
                            database=db.mysql_db,
                            cursorclass=pymysql.cursors.DictCursor) 

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
    
class JsonExtendEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, bytes) or isinstance(o, bytearray):
      return o.decode()
    elif isinstance(o, datetime):
      return o.strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(o, date):
      return o.strftime('%Y-%m-%d')
    else:
      return json.JSONEncoder.default(self, o)

def get_json_from_query(sql_statement):
  with connection.cursor() as cursor:
    cursor.execute(sql_statement)
    rows = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]
    json_res = [dict(zip(row_headers, row)) for row in rows]

  return json.dumps(json_res, cls=JsonExtendEncoder)

@app.route('/')
def test():
  return "works!"

@app.route('/api/albums')
def get_albums():
  json_str = get_json_from_query("SELECT * FROM album")
  return json_str

@app.route('/api/image')
def get_images():
  json_str = get_json_from_query("SELECT * FROM image")
  return json_str

@app.route('/api/time')
def get_current_time():
  return {'time': time.time()}
