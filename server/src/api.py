import pymysql
from app import app
from config import mysql, login_manager, queries
from flask import flash, request, render_template, jsonify, make_response, redirect, session, Response, send_file
import spotify_utils as spotify_utils
import requests
import json
from werkzeug.exceptions import HTTPException
from flask_login import login_required, login_user, UserMixin, current_user, logout_user
from werkzeug.security import check_password_hash
import jwt
from datetime import datetime, timedelta
import bcrypt
from werkzeug.utils import secure_filename
import os

class User(UserMixin):
    def __init__(self, id, secret_key, admin=False):
        self.id = id
        self.secret_key = secret_key
        self.admin = admin

    @staticmethod
    def get_user_by_id(id):
        # Load user object from database or other data source
        # You can use this method to retrieve a user object given an ID
        # and return None if the user does not exist
        return User(id, app.secret_key)  # Replace this with your own implementation    

    def get_id(self):
        return str(self.id)

    def is_admin(self):
        return self.admin
    
    def get_user_auth_token(self, admin=False, expires_in=timedelta(days=60)):
        current_date = datetime.today()
        """Generate a JWT token for the user"""
        token_payload = {
            'id': self.id,
            'exp': current_date + expires_in,
            'admin': admin
        }
        token = jwt.encode(token_payload, self.secret_key, algorithm='HS256')
        return token
    
    @staticmethod
    def verify_auth_token(token, secret_key):
        """Verify the authenticity of a JWT token"""
        try:
            print("verify:", token)
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
            print(data['id'], data['admin'])
            return User(id=data['id'], secret_key=secret_key, admin=data['admin'])
        except jwt.ExpiredSignatureError:
            print('jwt.ExpiredSignatureError')
            return None  # Token has expired
        except (jwt.InvalidTokenError, KeyError):
            print('jwt.InvalidTokenError')
            return None  # Invalid token
        
def get_user_from_header(request):

    auth_header = request.headers.get('Authorization')

    # Extract token
    token = ""
    if auth_header:
        token = auth_header.split()[1]

    # Get user from token
    user = User.verify_auth_token(token, app.secret_key)
    return user

@login_manager.user_loader
def load_user(user_id):
    # Load the user from the database
    # For example, you might use a User model with an ID field
    # Here we assume that the User model has a method `get_by_id`
    user = User.get_user_by_id(user_id)
    return user

@app.route('/add/album/<status>', methods=['POST'])
def process_album(status):
    # Get the album URL from the header
    album_url = request.json.get('collection_url')
    if not album_url:
        return Response(response="Not valid Spotify link.", status=400) 
    if not spotify_utils.check_spotify_url(album_url):
        return Response(response="Not valid Spotify link.", status=400)
    
    album_list, album_genre_list, track_list, track_artist_list, artist_list, artist_collection_list, track_collection_list = spotify_utils.get_spotify_data(album_url)
    
    if album_list is None:
        return Response(response="Not valid Spotify link.", status=400)
    
    try:
        # Connect to the database and get a cursor object
        with mysql.connect() as conn, conn.cursor() as cursor:
            # Insert the data into the Collection table
            collection_values = [(album['Collection_URI'], album['Collection_name'], album['Type'], album['Cover_image'], album['Release_date']) for album in album_list]
            collection_query = queries['collections'].get('collection_query')
            cursor.executemany(collection_query, collection_values)
            conn.commit()
            # Adding null review, rating and status to user list
            if request.headers:
                user = get_user_from_header(request)                
                if user is None:
                    return Response(response="Bad token.", status=400)
                
                # review and rating from json
                rating = request.json.get('rating')
                review = request.json.get('review')

                # Populate data for queries
                user_collection = [(user.get_id(), album['Collection_URI']) for album in album_list]
                user_rate = [(user.get_id(), album['Collection_URI'], rating) for album in album_list]
                user_review = [(user.get_id(), album['Collection_URI'], review) for album in album_list]
                user_status = [(user.get_id(), album['Collection_URI'], status) for album in album_list]

                # Get user queries from json
                user_collection_query = queries['collections'].get('user_collection_query')
                user_rate_query = queries['collections'].get('user_rate_query')
                user_review_query = queries['collections'].get('user_review_query')
                user_status_query = queries['collections'].get('user_status_query')
                
                # Execute user queries w/ data
                cursor.executemany(user_collection_query, user_collection)
                conn.commit()

                if cursor.rowcount == 0:
                    return Response("User inputted duplicate collection.", status=409)
                
                cursor.executemany(user_rate_query, user_rate)                     
                cursor.executemany(user_review_query, user_review)
                cursor.executemany(user_status_query, user_status)
                conn.commit()


            # Insert data into the Track table
            track_values = [(track['Track_URI'], track['Track_name'], track['Track_length'], track['Track_no']) for track in track_list]
            track_query =  queries['collections'].get('track_query')
            cursor.executemany(track_query, track_values)

            # Insert the data into the Artist table
            artist_values = [(artist['Artist_URI'], artist['Artist_name'], artist['Image']) for artist in artist_list]
            artist_query = queries['collections'].get('artist_query')
            cursor.executemany(artist_query, artist_values)

            # Commit the changes to the database
            conn.commit()

            # Insert data into the Has_Track table
            has_track_values = [(track_artist['HasT_artist_URI'], track_artist['HasT_track_URI']) for track_artist in track_artist_list]
            has_track_query = queries['collections'].get('has_track_query')         
            cursor.executemany(has_track_query, has_track_values)

            # Insert the data into the Collection_Genre table
            collection_genre_values = [(album_genre['CG_collection_URI'], album_genre['genre']) for album_genre in album_genre_list]
            collection_genre_query = queries['collections'].get('collection_genre_query')         
            cursor.executemany(collection_genre_query, collection_genre_values)

            # Insert the data into the Has_Collection table
            has_collection_values = [(artist_collection['HasC_artist_URI'], artist_collection['HasC_collection_URI']) for artist_collection in artist_collection_list]
            has_collection_query = queries['collections'].get('has_collection_query')           
            cursor.executemany(has_collection_query, has_collection_values)

            # Insert the data into the Track_in_Collection table
            track_collection_values = [(track_collection['TiC_track_URI'], track_collection['TiC_collect_URI']) for track_collection in track_collection_list]
            track_collection_query = queries['collections'].get('track_collection_query')          
            cursor.executemany(track_collection_query, track_collection_values)
            
            # Commit the changes to the database
            conn.commit()

            # I should return album data so that they can update now
            return Response(response=f"{album_list[0].get('Collection_name')} by {artist_list[0].get('Artist_name')} is added.",
                            status=200)
    except Exception as e:
        return Response(response="Unexpected error.", status=400)

@app.route('/', methods=["GET","POST"])
def index():
    if request.method == "POST":
        url = "http://localhost:5000/spotify/album"
        collection_url = request.form.get('link')
        data = {"collection_url": collection_url}
        response = requests.post(url, json=data)
        return jsonify(response.text)
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    admin = False

    # Check headers if exists
    if request.headers:
        user = get_user_from_header(request)

        # Check if user is admin to create new admin
        if user:
            admin = user.is_admin()

    # Make sure there is a form sent
    if not request.form:
        return Response(response="Invalid form data.", status=400)

    # Get username and pw from inserted form
    username = request.form.get('username')
    password = request.form.get('password')
    if not username or not password:
        return Response(response="No username or password in form.", status=400)

    # Connect to db
    with mysql.connect() as conn, conn.cursor() as cursor:

        # Check if username is in the db
        data = [username]
        query = queries['credentials'].get('user_in_db_query')
        cursor.execute(query, data)
        row = cursor.fetchone()
        if row:
            return Response(response="Username already exists.", status=400)
        
        # Hash password and user to the user table
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        data = [username, hashed_password.decode('utf-8'), None]
        query = queries['credentials'].get('register_query')
        cursor.execute(query, data)
        conn.commit()

        # Add to admin table if token inserted is an admin user
        if admin:
            print("Adding new admin.")
            query = queries['credentials'].get('register_admin_query')
            cursor.execute(query, [username])
            conn.commit()

    # User is added
    return Response(response="User registered successfully.", status=200)
        
@app.route('/login', methods=["POST"])
def login():
    # Make sure there is a form sent
    if not request.form:
        return Response(response="Invalid form data.", status=400)
    
    username = request.form.get('username')
    password = request.form.get('password')

    if not (username and password):
        return Response(response="No username or password in form.", status=401)

    with mysql.connect() as conn, conn.cursor() as cursor:
        data = [username]
        query = queries['credentials'].get('user_in_db_query')
        cursor.execute(query, data)
        account = cursor.fetchone()

        if account:
            # Check if password is correct
            stored_password = account[1].encode('utf-8')
            if not bcrypt.checkpw(password.encode('utf-8'), stored_password):
                return Response("Wrong password.", status=403)
            
            # Check if user is admin
            admin = account[2]
            if admin:
                admin = True
            else:
                admin = False

            # Create token     
            query = queries['credentials'].get('user_in_db_query')
            cursor.execute(query, data)
            user = User(id=username, secret_key=app.secret_key, admin=admin)
            token = user.get_user_auth_token(admin=admin)

            # Create response and cookies from token
            resp = Response(response=json.dumps({'token': token,
                                                'name': username,
                                                'admin': admin}), 
                                                status=200, 
                                                mimetype='application/json')
            resp.set_cookie('token', token, httponly=True, samesite='None', secure=True)
            print("Token from login:", token)
            return resp
        
    return Response(response="Login unsuccessful. Incorrect username or password.", status=400)

@app.route('/logout')
def logout():
    try:
        # Check headers if exists
        if not request.headers:
            return Response(response="Invalid header data.", status=401)
        
        # Retrieve user
        user = get_user_from_header(request)

        if not user:
            return Response(response='Bad Token.', status=401)
        
        # Destroy token
        resp = Response(response='Logout successful', status=200)
        resp.set_cookie('token', '', expires=0)
        return resp
    
    except Exception as e: 
        return handle_exception(e)   
    
@app.route('/user/delete')
def delete_user(methods=["POST"]):
    try:
        # Check headers if exists
        if not request.headers:
            return Response(response="Invalid header data.", status=400)

        # Retrieve user
        user = get_user_from_header(request)
        if not user:
            return Response(response="Bad token", status=400)
        user_id = user.get_id()

        # Connect to db and delete user
        with mysql.connect() as conn, conn.cursor() as cursor:
            query = queries['credentials'].get('delete_user_query')
            cursor.execute(query, (user_id,))
            conn.commit()
            flash('Your account has been deleted!', 'success')
            resp = Response(response=f"Your account has been deleted. Goodbye {user_id}.", status=200)
            resp.set_cookie('token', '', expires=0)

            return resp
        
    except Exception as e:
        flash('An error occurred while deleting your account.', 'danger')
        return handle_exception(e)
        
@app.route('/profile')
def profile():
    try:
        # Check headers if exists
        if not request.headers:
            return Response(response="Invalid header data.", status=400)

        # Retrieve user
        user = get_user_from_header(request)

        if not user:
            return Response(response="Bad token", status=400)
        user_id = user.get_id()
        return {'profile_name': user_id}, 200
    
    except Exception as e:
        return handle_exception(e)
    
@app.route('/delete/album', methods=['POST'])
def delete_user_collection():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response(response="Bad token", status=400)
    if not request.json:
        return Response("No data from json.", status=400)
    
    # Get data for query from headers
    username = user.get_id()
    collection_uri = request.json.get('collection_uri')
    with mysql.connect() as conn, conn.cursor() as cursor:
        for query_name in ['delete_u_collection_query', 'delete_u_collection_status_query',
                      'delete_u_collection_rate_query', 'delete_u_collection_review_query']:
            # Execute query
            query = queries['delete'].get(query_name)
            cursor.execute(query, [username, collection_uri])
            conn.commit()
            # Checks if the upadte went through
            if cursor.rowcount == 0:
                return Response(f"Delete {query_name} failed on commit.", status=400)
    return Response("Delete user collection successful.", status=200) 

@app.route('/update/album', methods=['POST'])
def update_user_collection():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response(response="Bad token", status=400)
    if not request.json:
        return Response("No data from json.", status=400)
    
    if not all(key in request.json.keys() for key in ["type", "collection_uri", "value"]):
        return Response("Wrong json keys.", status=400)

    # Get data for query from headers
    query_type = request.json.get('type')

    username = user.get_id()
    collection_uri = request.json.get('collection_uri')
    val = request.json.get('value')

    with mysql.connect() as conn, conn.cursor() as cursor:
        # Execute query
        query = queries['update'].get(f'update_{query_type}_query')
        cursor.execute(query, [val, username, collection_uri])
        conn.commit()

        # Checks if the upadte went through
        if cursor.rowcount > 0:
            return Response(f"Update {query_type} successful.", status=200)
        else:
            return Response(f"Update {query_type} failed on commit.", status=400)

@app.route('/update/password', methods=['POST'])
def update_password():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response("Bad Token.", status=403)
    if not request.form:
        return Response('Bad Form.', status=403)
    if (request.form.get('old_password') is None) or (request.form.get('new_password') is None):     
        return Response('No password in form.', status=403)
    
    # Connect to database
    with mysql.connect() as conn, conn.cursor() as cursor:
        
        # Check if user in database
        data = [user.get_id()]
        query = queries['credentials'].get('user_in_db_query')
        cursor.execute(query, data)
        account = cursor.fetchone()
        if not account:
            return Response("Bad username in token.", status=403)
        
        # Check for db password matches with inputted old password
        old_password = request.form.get('old_password')
        stored_password = account[1].encode('utf-8')
        if not bcrypt.checkpw(old_password.encode('utf-8'), stored_password):
            return Response("Bad password", status=403)
        
        #Update and hash with new password
        query = queries['update'].get('update_password_query')
        new_password = request.form.get('new_password')
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        data = [hashed_password, user.get_id(), stored_password]
        cursor.execute(query, data)
        conn.commit()

        # Checks if the upadte went through
        if cursor.rowcount > 0:
            return Response("Update password successful.", status=200)
        else:
            return Response("Update password failed on commit.", status=400)

@app.route('/update/image', methods=['POST'])
def upload_image():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response("Bad Token.", status=403)
    
    # Check if image exists and allowed
    if 'image' not in request.files:
        return Response(response='No image file uploaded', status=400)
    
    # Check if file is correct format
    file = request.files['image']
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
    if not file.filename.rsplit('.', 1)[1].lower() in allowed_extensions:
        return Response(response="File type not allowed", status=400)
    
    filename = user.get_id() + '.jpg'
    saved_file_path = os.path.join(app.config['images_dir'], filename)

    try:
        file.save(saved_file_path)
    except Exception as e:
        return Response(response="Error saving file", status=500)
    
    return Response(response=f'{filename} has been saved in the database.', status=200)

@app.route('/user/image')
def get_user_image():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response("Bad Token.", status=403)
    
    # Get image file name
    filename = user.get_id() + '.jpg'
    filepath = os.path.join(app.config['images_dir'], filename)
    
    # Check if file exists
    if not os.path.exists(filepath):
        return Response(response='File not found', status=404)
    
    # Return file as response
    return send_file(filepath, mimetype='image/jpeg')

@app.route('/user/image/<string:username>')
def get_user_image_link(username):
    # Get image file name
    filename =  username + '.jpg'
    filepath = os.path.join(app.config['images_dir'], filename)
    
    # Check if file exists
    if not os.path.exists(filepath):
        return Response(response='File not found', status=404)
    
    # Return file as response
    return send_file(filepath)

@app.route('/user/collection')
def get_user_list():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response("Bad Token.", status=403)
    user_id = user.get_id()
    
    with mysql.connect() as conn, conn.cursor() as cursor:
        # Get user collections
        query = queries['collections'].get('user_list_query')
        cursor.execute(query, [user_id])
        collections = cursor.fetchall()
        # Get the columns for the collections table
        collection_cols = [col[0] for col in cursor.description]
        # Loop through each collection
        for collection in collections:
            collection_dict = {}
            # Map the collection columns to the corresponding values
            for i, col_name in enumerate(collection_cols):
                collection_dict[col_name] = collection[i]
            # Get tracks for the collection
            query = queries['collections'].get('tracks_by_collection_query')
            cursor.execute(query, [collection[2]])
            tracks = cursor.fetchall()
            # Get the columns for the tracks table
            track_cols = [col[0] for col in cursor.description]
            tracks_list = []
            # Loop through each track
            for track in tracks:
                track_dict = {}
                # Map the track columns to the corresponding values
                for i, col_name in enumerate(track_cols):
                    track_dict[col_name] = track[i]
                tracks_list.append(track_dict)
            collection_dict['tracks'] = tracks_list
            user_collections_list.append(collection_dict)
    # Return the collections as a JSON response
    user_collections = {'collection_items': user_collections_list}
    return jsonify(user_collections)

@app.route('/user/stats')
def get_user_stats():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response("Bad Token.", status=403)
    user_id = user.get_id()
    stats = {}

    with mysql.connect() as conn, conn.cursor() as cursor:
        for query_name, name in [('collections_by_year_query', 'collections_by_year'), 
                                 ('collections_by_rating_query', 'collections_by_rating'),
                                 ('collection_count_by_status_query', 'collection_by_status'),
                                 ('total_minutes_listened_by_collection_status_complete_query', 'minutes_collection_complete'),
                                 ('total_minutes_listened_by_collection_status_planned_query', 'minutes_collection_planned')]:
            query = queries['stats'].get(query_name)
            cursor.execute(query, [user_id])
            rows = cursor.fetchall()
            item_cols = [col[0] for col in cursor.description]
            item_dicts = []
            for row in rows:
                item_dict = {}
                for i, col_name in enumerate(item_cols):
                    item_dict[col_name] = row[i]
                item_dicts.append(item_dict)
            # Fix this to get collection 
            if len(rows) == 1:
                stats[name] = item_dicts[0]
            elif len(rows) == 0:
                stats[name] = {}
            else:
                stats[name] = item_dicts

    return jsonify(stats)

@app.route('/admin/stats')
def get_admin_stats():
    # Check headers if exists
    if not request.headers:
        return Response(response="Invalid header data.", status=400)
    user = get_user_from_header(request)
    if not user:
        return Response("Bad Token.", status=403)
    
    if not user.is_admin():
        return Response("Not an admin.", status=403)
    
    stats = {}

    with mysql.connect() as conn, conn.cursor() as cursor:
        for query_name, name in [('total_tracks_and_lengths_in_db_query', 'tracks'), 
                                 ('total_collections_in_db_query', 'collections'),
                                 ('total_collections_in_db_by_year_query', 'collections_by_year'),
                                 ('total_users_in_query', 'users')]:
            query = queries['stats'].get(query_name)
            cursor.execute(query)
            rows = cursor.fetchall()
            item_cols = [col[0] for col in cursor.description]
            item_dicts = []
            for row in rows:
                item_dict = {}
                for i, col_name in enumerate(item_cols):
                    item_dict[col_name] = row[i]
                item_dicts.append(item_dict)
            # item_dicts = [dict(zip([col[0] for col in cursor.description], row)) for row in rows]        
            # if len(item_cols) > 1 and len(rows) > 1:
            #     stats[name] = item_dicts
            # elif len(item_cols) > 1 and len(rows) == 1:
            #     for col_name in item_cols:
            #         stats[col_name] = item_dicts[0][col_name]
            # else:
            #     stats[name] = item_dicts[0]

            # if len(rows) == 1:
            #     for col_name in item_cols:
            #         stats[col_name] = item_dicts[0][col_name]
            # else:
            #     stats[name] = item_dicts

            if len(rows) == 1:
                stats[name] = item_dicts[0]
            elif len(rows) == 0:
                stats[name] = {}
            else:
                stats[name] = item_dicts

    return jsonify(stats)

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0")