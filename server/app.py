from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Post
import datetime

class Signup(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        password = request_json.get('password')
        name = request_json.get('name')
        bio = request_json.get('bio')

        user = User(
            username=username,
            name=name,
            bio=bio
        )
        user.password_hash = password
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        
class CheckSession(Resource):
    def get(self):
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
            return {'error': 'Invalid session.'}, 401
        return {'error': 'Session does not exist.'}, 401
    
class Login(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        password = request_json.get('password')
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            return {'error': 'Invalid Username or Password.'}, 401
        return {'error': 'Invalid Username or Password.'}, 401
    
class Logout(Resource):
    def delete(self):
        if session['user_id']:
            session['user_id'] = None
            return {}, 204
        else:
            return {'error': 'No active session to logout.'}, 401
        
class PostIndex(Resource):
    def get(self):
        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            return [post.to_dict() for post in user.posts], 200
        return {'error': '401: Unauthorized'}, 401
    def post(self):
        request_json = request.get_json()
        content = request_json.get('content')
        try:
            post = Post(
                content=content,
                timestamp=datetime.datetime.utcnow,
                user_id=session['user_id']
            )
            db.session.add(post)
            db.session.commit()
            return post.to_dict(), 201
        except ValueError:
            return {'error': '422 Unprocessable Entity'}, 422
        
        
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(PostIndex, '/posts', endpoint='posts')
