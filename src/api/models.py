from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    role = db.relationship('Role', backref='user', lazy=True)
    
    @classmethod
    def get_by_id(cls,id): 
        user = cls.query.get(id)
        return user

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active,
            "role": self.role.serialize()
            # do not serialize the password, its a security breach
        }

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id":self.id,
            "name": self.name
        }



