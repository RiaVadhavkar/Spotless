import pymysql
from app import app
from config import mysql, login_manager
from flask import flash, request, render_template, jsonify, make_response, redirect, session
import spotify_utils as spotify_utils
import requests
import json
from werkzeug.exceptions import HTTPException
from flask_login import login_required, login_user, UserMixin, current_user, logout_user

class User(UserMixin):
    def __init__(self, id):
        self.id = id

    @staticmethod
    def get_user_by_id(id):
        # Load user object from database or other data source
        # You can use this method to retrieve a user object given an ID
        # and return None if the user does not exist
        return User(id)  # Replace this with your own implementation    
          
    def get_id(self):
        return str(self.id)
    
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False
    
@login_manager.user_loader
def load_user(user_id):
    # Load the user from the database
    # For example, you might use a User model with an ID field
    # Here we assume that the User model has a method `get_by_id`
    user = User.get_user_by_id(user_id)
    return user

# TODO: Add functionality to add based off of logged in user
@app.route('/spotify/album', methods=['POST'])
def process_album():
    # Get the album URL from the header
    album_url = request.json.get('collection_url')
    if not spotify_utils.check_spotify_url(album_url):
        resp = {'error': 'Bad url'}
        return jsonify(resp), 500
    
    album_list, album_genre_list, track_list, track_artist_list, artist_list, artist_collection_list, track_collection_list = spotify_utils.get_spotify_data(album_url)
    
    if album_list is None:
        resp = {'error': 'Bad url'}
        return jsonify(resp), 500 
    
    # Declare the conn variable outside the try block and set its initial value to None
    conn = None
    cursor = None
    data = None
    query = None

    try:
        # Get the connection to db
        conn = mysql.connect()

        # Get the cursor object
        cursor = conn.cursor()

        # Insert the data into the Collection table
        collection_values = [(album['Collection_URI'], album['Collection_name'], album['Type'], album['Cover_image'], album['Release_date']) for album in album_list]
        collection_query = "INSERT IGNORE INTO Collection (Collection_URI, Collection_name, Type, Cover_image, Release_date) VALUES (%s, %s, %s, %s, %s)"
        data = collection_values
        query = collection_query
        cursor.executemany(collection_query, collection_values)

        # # Adding null review and rating to user list
        if current_user.is_authenticated:
            print("Current user:", current_user.get_id())
            user_collection = [(current_user.get_id(), album['Collection_URI']) for album in album_list]
            user_collection_query = "INSERT IGNORE INTO U_Collection (Collection_username, Collection_URI) VALUES (%s, %s)"
            user_rate_query = "INSERT IGNORE INTO U_Rate (Rate_username, Rate_collection_URI) VALUES (%s, %s)"
            user_review_query = "INSERT IGNORE INTO U_Review (U_Review, Reivew_collection_URI) VALUES (%s, %s)"
            data = user_collection
            query = user_collection_query
            cursor.executemany(query, data) 
            query = user_rate_query
            cursor.executemany(query, data) 
            query = user_review_query
            cursor.executemany(query, data)

        # Insert data into the Track table
        track_values = [(track['Track_URI'], track['Track_name'], track['Track_length']) for track in track_list]
        track_query = "INSERT IGNORE INTO Track (Track_URI, Track_name, Track_length) VALUES (%s, %s, %s)"
        data = track_values
        query = track_query        
        cursor.executemany(track_query, track_values)

        # Insert the data into the Artist table
        artist_values = [(artist['Artist_URI'], artist['Artist_name'], artist['Image']) for artist in artist_list]
        artist_query = "INSERT IGNORE INTO Artist (Artist_URI, Artist_name, Image) VALUES (%s, %s, %s)"
        data = artist_values
        query = artist_query
        cursor.executemany(artist_query, artist_values)

        # Commit the changes to the database
        conn.commit()

        # Insert data into the Has_Track table
        has_track_values = [(track_artist['HasT_artist_URI'], track_artist['HasT_track_URI']) for track_artist in track_artist_list]
        has_track_query = "INSERT IGNORE INTO Has_Track (HasT_artist_URI, HasT_track_URI) VALUES (%s, %s)"
        data = has_track_values
        query = has_track_query              
        cursor.executemany(has_track_query, has_track_values)

        # Insert the data into the Collection_Genre table
        collection_genre_values = [(album_genre['CG_collection_URI'], album_genre['genre']) for album_genre in album_genre_list]
        collection_genre_query = "INSERT IGNORE INTO Collection_Genre (CG_collection_URI, Collec_genre) VALUES (%s, %s)"
        data = collection_genre_values
        query = collection_genre_query            
        cursor.executemany(collection_genre_query, collection_genre_values)

        # Insert the data into the Has_Collection table
        has_collection_values = [(artist_collection['HasC_artist_URI'], artist_collection['HasC_collection_URI']) for artist_collection in artist_collection_list]
        has_collection_query = "INSERT IGNORE INTO Has_Collection (HasC_artist_URI, HasC_collection_URI) VALUES (%s, %s)"
        data = has_collection_values
        query = has_collection_query            
        cursor.executemany(has_collection_query, has_collection_values)

        # Insert the data into the Track_in_Collection table
        track_collection_values = [(track_collection['TiC_track_URI'], track_collection['TiC_collect_URI']) for track_collection in track_collection_list]
        track_collection_query = "INSERT IGNORE INTO Track_In_Collection (TiC_track_URI, TiC_collect_URI) VALUES (%s, %s)"
        data = track_collection_values
        query = track_collection_query            
        cursor.executemany(track_collection_query, track_collection_values)
        
        # Commit the changes to the database
        conn.commit()
    except Exception as e:
        print(e)
        print("Data:", data)
        print("Query:", query)
        resp = {'error': 'An error occurred while processing the request.'}
        return jsonify(resp), 500

    finally:
        # Check if the cursor variable is not None before closing it
        if cursor is not None:
            cursor.close()

        # Check if the conn variable is not None before closing it
        if conn is not None:
            conn.commit()
            conn.close()
            print("Data added to db.")
            resp = {'message': 'Data added to db.'}
            return jsonify(resp), 200

    resp = {'error': 'An error occurred while processing the request.'}
    return jsonify(resp), 500

@app.route('/users/add', methods=["GET","POST"])
def user_add_link():
    # call spotify album and add data or we manipulate spotify album
    # get username and add db U_rate and U_review with default values w/ the collection URI
    pass

@app.route('/', methods=["GET","POST"])
def index():
    if request.method == "POST":
        url = "http://localhost:5000/spotify/album"
        collection_url = request.form.get('link')
        data = {"collection_url": collection_url}
        response = requests.post(url, json=data)
        print(response)
        return jsonify(response.json())
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    if request.method != 'POST':
        resp = {'error': 'An error occurred while processing the request.',
                'reason': 'Invalid request method.'}
        return jsonify(resp), 400

    username = request.form.get('username')
    password = request.form.get('password')
    if not username or not password:
        resp = {'error': 'An error occurred while processing the request.',
                'reason': 'No username or password in form.'}
        return jsonify(resp), 400

    conn = None
    cursor = None
    try: 
        conn = mysql.connect()
        cursor = conn.cursor()

        data = [username]
        query = "SELECT Username FROM User WHERE Username = %s"
        cursor.execute(query, data)
        queryRes = cursor.fetchone()
        if queryRes:
            print("Username already exists")
            resp = {'error': 'Username already exists.'}
            return jsonify(resp), 409

        data = [username, password, None]
        query = "INSERT IGNORE INTO User (Username, Password, User_profile_pic) VALUES (%s, %s, %s)"
        cursor.execute(query, data)
        conn.commit()
    except Exception as e:
        print(e)
        resp = {'error': 'An error occurred while processing the request.'}
        return jsonify(resp), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
    return redirect('/login')

@app.route('/login', methods=["POST"])
def login():
    if request.method == "POST" and 'username' in request.form and 'password' in request.form:
        try: 
            username = request.form.get('username')
            password = request.form.get('password')
            
            conn = mysql.connect()
            cursor = conn.cursor()

            data = [username, password]
            query = "SELECT Username, Password FROM User WHERE Username = %s AND Password = %s"
            cursor.execute(query, data)
            account = cursor.fetchone()
            
            if account:
                user = User(id=username)
                login_user(user)
                return {'login': 'successful.'}, 200
            else:
                print("Login unsuccessful. Incorrect username or password.")
                return redirect('/login')
        
        except Exception as e:
            print(e)
            resp = {'error': 'An error occurred while processing the request.'}
            return jsonify(resp), 500
        
        finally:
            if conn is not None and cursor is not None:
                conn.close()
                cursor.close()
    else:
        resp = {'error': 'An error occurred while processing the request.',
                'reason': 'No username or password in form.'}
        return jsonify(resp), 500
                   
@app.route('/logout')
@login_required
def logout():
    username = current_user.get_id()
    print("Logging out:", username)
    # Logging out user
    logout_user()
    # Redirect user to login page
    return redirect('/login')
        
@app.route('/user/delete')
@login_required
def delete_user():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        username = current_user.get_id()

        query = "DELETE FROM User WHERE Username = %s"
        cursor.execute(query, (username,))
        conn.commit()
        flash('Your account has been deleted!', 'success')
        logout_user()
        return redirect('/')
    except Exception as e:
        print(e)
        flash('An error occurred while deleting your account.', 'danger')
        return redirect('/user/profile')
    finally:
        if conn is not None and cursor is not None:
            cursor.close()
            conn.close()
    
@app.route('/profile')
@login_required
def profile():
    # This view is only accessible to authenticated users
    return {'profile_name': current_user.get_id()}, 200

# @app.route('/login', methods=["GET","POST"])
# def login():
#     url = spotify_utils.authenticate_user()
#     # print(url)
#     return redirect(url)

# @app.route('/callback', methods=["GET", "POST"])
# def callback():
#     code = request.args.get('code')
#     print(code)
#     token_info = sp_oauth.get_access_token(code)
#     access_token = token_info['access_token']
#     refresh_token = token_info['refresh_token']

#     # Save the access_token and refresh_token to a database or session for later use
#         # Declare the conn variable outside the try block and set its initial value to None
    # conn = None
    # cursor = None
    # data = None
    # query = None

    # try:

    #     # Read user information
    #     sp = spotipy.Spotify(sp_oauth)
    #     user = sp.me()
    #     username_uri = user['uri']
        # profile_picture = user['images'][0]['url']
        # display_name = user['display_name']

        # # Get the connection to db
        # conn = mysql.connect()

        # # Get the cursor object 1z4g3DjTBBZKhvAroFlhOM
        # cursor = conn.cursor()

        # # Look to delete User(password) 
        # user_values = [username_uri, "filler_password", profile_picture, access_token, refresh_token, display_name]
        # print(user_values)
        # query = "INSERT IGNORE INTO User (Username_URI, Password, User_profile_pic, User_token, User_refresh_token, Display_name) VALUES(%s, %s, %s, %s, %s)"
        # cursor.execute(query, user_values)
#     except Exception as e:
#         print(e)
#         print("Data:", data)
#         print("Query:", query)
#         if conn is not None and cursor is not None:
#             conn.close()
#             cursor.close()
#             print("Data added to db.")
#         resp = {'error': 'An error occurred while processing the request.'}
#         return jsonify(resp), 500
#     finally:
#         # Check if the conn variable is not None before closing it
#         if conn is not None and cursor is not None:
#             conn.close()
#             cursor.close()
#             return redirect('/')
        
#     return redirect('/') # To the home screen

# @app.route('/logout', methods=["GET", "POST"])
# def logout():
#     pass

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

if __name__ == "__main__":
    app.run(host="0.0.0.0")

