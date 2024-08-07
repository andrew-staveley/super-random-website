from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Post
import datetime

fake = Faker()

with app.app_context():
    print('Deleting all records')
    Post.query.delete()
    User.query.delete()
    fake = Faker()
    print('Creating Users')

    users = []

    usernames = []

    for i in range(20):

        name = fake.first_name()
        username = name + fake.last_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username,
            name=name,
            bio=fake.paragraph(nb_sentences=3)
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print('Creating Posts')
    posts = []
    for i in range(100):
        content = fake.paragraph(nb_sentences=8)
        post = Post(
            content=content,
            timestamp=datetime.datetime.now()
        )
        post.user = rc(users)
        posts.append(post)
    db.session.add_all(posts)
    db.session.commit()
    print('Complete')
