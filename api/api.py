import time
import os
import json
import keys

import pymysql.cursors
import boto3

from datetime import date, datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# mysql.connection.commit() do if inserting into database, or posting

# Configure db
connection = pymysql.connect(host=keys.mysql_host,
                            user=keys.mysql_user,
                            password=keys.mysql_password,
                            database=keys.mysql_db,
                            cursorclass=pymysql.cursors.DictCursor) 

s3 = boto3.client('s3',
                  aws_access_key_id=keys.aws_access_key_id,
                  aws_secret_access_key=keys.aws_secret_access_key)
    
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
  return "This returns something!"

@app.route('/api/time')
def get_current_time():
  return {'time': time.time()}

@app.route('/api/albums')
def get_albums():
  json_str = get_json_from_query("SELECT * FROM album")
  return json_str

@app.route('/api/image')
def get_images():
  json_str = get_json_from_query("SELECT * FROM image")
  return json_str

@app.route('/api/music', methods=['POST', 'GET'])
def music_endpoint():
  if request.method == 'POST':
    img = request.files['pic']

    if img and img.filename != '':
      filename = secure_filename(img.filename)
      img.save(filename)

      s3.upload_file(filename, keys.s3_bucket_name, "abc/filename")

      return "test"


  return 'Success'
