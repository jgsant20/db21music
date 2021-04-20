## Info on app:
- FlaskPy used to host backend api, deployed on aws lambda.
- ReactJS used for client frontend, deployed on netlify.
- MySQL on AWS RDS.
- Cloud storage on and AWS s3 buckets.

## Dependencies:
- python 3.5-3.9
- node 14.16.1 (not sure if hard requirement, it's what I had)
- homebrew (mac only)

## Setting up react-app in Mac + Windows:
Run the following commands:
- `yarn`
- `yarn start` 

## Setting up flask-api on Windows:
To setup the flask api, we create a venv, launch a terminal inside it, download the necessary modules, then launch the app.
After we do this once, we can run it through the simple `yarn start-api` command from the root folder to launch the app.
- `cd api`
- `python -m venv venv` (create virtual environment with folder name, venv)
- `venv\Scripts\activate` (activate virtual environment)
- `pip install --upgrade --force-reinstall -r requirements.txt` (update modules installed in venv)
- `flask run` (see if flask api runs)

## Setting up flask-api on Mac:
To setup the flask api, we create a venv, launch a terminal inside it, download the necessary modules, then launch the app.
After we do this once, we can run it through the simple `yarn start-api-mac` command from the root folder to launch the app.
- `cd api`
- `python3 -m venv venv` (create virtual environment with folder name, venv)
- `source venv/bin/activate` (activate virtual environment)
- `pip install --upgrade --force-reinstall -r requirements.txt` (update modules installed in venv)
  - If you encounter an issue with mysqlclient installing correctly, run the following commands:
    - `brew install mysql` 
    - `export PATH=$PATH:/usr/local/mysql/bin` (actually not sure if this one is necessary)
    - `pip install mysqlclient` (reinstall it)
- `flask run` (see if flask api runs)

## keys.py in flask-api
To actually run the flask-api, you need to generate a number of keys
- Host cloud DBMS locally or on AWS RDS
- Create an s3 instance for cloud storage

Here are all the variables needed:
```
# mysql access
mysql_host = 'mysqlurl'
mysql_user = 'username'
mysql_password = 'pass'
mysql_db = 'mysqldb'

# s3 storage access
aws_access_key_id = 'awsaccesskey'
aws_secret_access_key = 'awssecretaccesskey'
s3_bucket_name = 's3bucketname'
s3_url = 's3url'

# secret key for jwt tokens
secret_key = 'tokenstuff'
```

## Commands (Windows):
- `yarn start`
- `yarn start-api`

## Commands (Mac):
- `yarn start`
- `yarn start-api-mac`

## Justin-only deploy related update commands + other:
- `serverless deploy` 
- `pip install --upgrade --force-reinstall -r requirements.txt`
- `zappa update dev`
