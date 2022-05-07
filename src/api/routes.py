"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/userDetail', methods=['GET'])
@jwt_required()
def user_detail():
      
    id=  get_jwt_identity()
    print(id,"aaaaaaaaaaaaaaaaaaaaaaa")
    user = User.get_by_id(id)
    
    return jsonify(user.serialize()), 200




@api.route('/role', methods=['GET'])
def list_roles():
    roles = Role.query.all()
    response = [role.serialize() for role in roles]
    return jsonify(response), 200

@api.route('/user', methods=['GET'])
def list_user():
    users = User.query.all()
    response = [user.serialize() for user in users]
    return jsonify(response)

@api.route('/user', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role_id = data.get('role')
    if not name or not email or not password or not role_id:
        return jsonify({"message": "Es necesario (name, email, password y role)"}), 401

    user = User(name=name, email=email, password=password, role_id=role_id, is_active=True)
    db.session.add(user)
    db.session.commit()
    if not user:
        return jsonify({"message": "Error al crear el usuario"}), 401
        
    return jsonify({"message": "Usuario creado"}), 200


@api.route('/token', methods=["POST"])
def create_token():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # Consulta la base de datos por el email de usuario y la contraseña
    user = User.query.filter_by(email=email,password=password).first()
    if not user:
          # el usuario no se encontró en la base de datos
        return jsonify({"message": "Bad username or password"}), 401
    
    # crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })