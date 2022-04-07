from flask import Flask, render_template, session, request, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
from datetime import datetime
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)


databaseUsers = 'mongodb+srv://2650:2650@cluster0.qphsl.mongodb.net/prattle?retryWrites=true&w=majority'
mongoDB = PyMongo(app, uri=databaseUsers)
dbCollectionGenMsg = mongoDB.db.generalMessages
dbCollectionUser  = mongoDB.db.Users

users = {}
@socketio.on('connect')
def on_connect():
    print('Client connected')
    socketio.emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def on_disconnect():
    users.pop(request.sid,'No user found')
    socketio.emit('current_users', users)
    print("User disconnected!\nThe users are: ", users)

@socketio.on('sign_in')
def user_sign_in(user_name, methods=['GET', 'POST']):
    print("-----------------------------------")
    users[request.sid] = user_name
    addToMongo(user_name)
    socketio.emit('current_users', users)
    print("New user sign in!\nThe users are: ", users)

@socketio.on('message')
def messaging(message, methods=['GET', 'POST']):
    print('received message: ' + str(message))
    message['from'] = request.sid
    socketio.emit('message', message, room=request.sid) #display to from screen
    socketio.emit('message', message, room=message['to']) #display to the receiver

@socketio.on('msgAll')
def messageAll(message, methods=['GET', 'POST']):
    socketio.emit('msgAll', message, broadcast=True)
    #   socketio.emit(broadcast, message)
    #socketio.emit('msgAll', message, room='general')
    print(message, "=== to general")

def addToMongo(username, methods=['GET', 'POST']):
    if dbCollectionUser.find_one({"username": username}):
        return jsonify(message = "The username is already in the database."), 409
    else:
        userJson = {}
        userJson["username"] = username
        dbCollectionUser.insert_one(userJson)
        return jsonify(message="User added successfully"), 201

@app.route('/getusers',methods=['GET','POST'])
def showUsers():
    return dbCollectionUser.find({})


if __name__ == '__main__':
    socketio.run(app, debug=True)