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
        if session['user_id']:
            userobj = User.query.filter(User.id == session['user_id']).first()
            if userobj:
                return userobj.to_dict(), 200
            return {'error': 'Invalid session.'}, 401
        else:
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
                timestamp=datetime.datetime.now(),
                user_id=session['user_id']
            )
            db.session.add(post)
            db.session.commit()
            return post.to_dict(), 201
        except ValueError:
            return {'error': '422 Unprocessable Entity'}, 422
        
class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        if posts:
            return [post.to_dict() for post in posts], 200
        return {'error': '401: Unauthorized'}
    
class RetrieveUser(Resource):
    def get(self):
        request_json = request.get_json()
        user_id = request_json('user_id')
        user = User.query.filter_by(User.id == user_id).first()
        if user:
            return user.to_dict(), 201
        return {'error': '400: Bad Request'}, 400
        
        
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(PostIndex, '/userpost', endpoint='userpost')
api.add_resource(Posts, '/posts', endpoint='posts')
api.add_resource(RetrieveUser, '/getuser', endpoint='getuser')

if __name__=='__main__':
    app.run(port=5555, debug=True)
