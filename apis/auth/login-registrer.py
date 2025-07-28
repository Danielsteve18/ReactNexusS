from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth, firestore
import requests
import jwt
import datetime
import random
import string 

# Inicializar Flask
app = Flask(__name__)
CORS(app)  # Permitir solicitudes desde el frontend

# Cargar credenciales de irebase (reemplaza con la ruta correcta)
cred = credentials.Certificate("nexus-5c53d-firebase-adminsdk-dzjbj-3a2030d8ae.json")
firebase_admin.initialize_app(cred)

# Conectar a Firestore
db = firestore.client()

# Configuración de la API REST de Firebase Authentication
FIREBASE_API_KEY = "AIzaSyB0gh9Hq5JXTEmeqvsJHLVQULdH1W7YffM"
SECRET_KEY = "AIzaSyB0gh9Hq5JXTEmeqvsJHLVQULdH1W7YffM"  # Cambia esto por una clave secreta segura

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data['correo']  # Cambiar a 'correo' para coincidir con el frontend
        password = data['contraseña']  # Cambiar a 'contraseña' para coincidir con el frontend

        # Validar las credenciales del usuario usando la API REST de Firebase
        login_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"
        login_payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }
        login_response = requests.post(login_url, json=login_payload)

        if login_response.status_code != 200:
            return jsonify({"error": "Credenciales incorrectas"}), 401

        login_data = login_response.json()
        uid = login_data["localId"]

        # Generar un token JWT
        token = jwt.encode({
            "uid": uid,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expira en 1 hora
        }, SECRET_KEY, algorithm="HS256")

        # Obtener el rol desde Firestore
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()

        if user_doc.exists:
            user_data = user_doc.to_dict()
            role = user_data.get("role", None)

            print(f"Usuario autenticado: {email}, Rol: {role}")  # Log para depuración

            return jsonify({
                "message": "Inicio de sesión exitoso",
                "token": token,
                "role": role
            }), 200
        else:
            return jsonify({"error": "Usuario no tiene rol asignado"}), 400

    except Exception as e:
        print(f"Error en login: {str(e)}")  # Log para depuración
        return jsonify({"error": str(e)}), 400

@app.route('/generate-code', methods=['POST'])
def generate_code():
    try:
        data = request.get_json()
        email = data['correo']  # Recibir el correo del usuario

        # Verificar si el correo ya está registrado en Firebase Authentication
        try:
            user = auth.get_user_by_email(email)
            return jsonify({"error": "El correo ya está registrado. Por favor, inicia sesión."}), 400
        except firebase_admin.auth.UserNotFoundError:
            # Si no se encuentra el usuario, se puede generar el código
            pass

        # Generar un código único de 6 caracteres
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

        # Guardar el código en Firestore
        code_ref = db.collection('codigos').document(email)
        code_ref.set({
            'codigo': code,
            'email': email,
            'usado': False  # Marcar el código como no usado
        })

        return jsonify({"message": "Código generado exitosamente", "codigo": code}), 201

    except Exception as e:
        print(f"Error al generar código: {str(e)}")  # Log para depuración
        return jsonify({"error": str(e)}), 400

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        nombre = data['nombre']
        email = data['correo']
        password = data['contraseña']
        codigo_ingresado = data['codigo']

        # Verificar el código en Firestore
        code_ref = db.collection('codigos').document(email)
        code_doc = code_ref.get()

        if not code_doc.exists:
            return jsonify({"error": "Código no encontrado"}), 400

        code_data = code_doc.to_dict()
        if code_data['codigo'] != codigo_ingresado:
            return jsonify({"error": "Código incorrecto"}), 400

        if code_data['usado']:
            return jsonify({"error": "Código ya fue usado"}), 400

        # Marcar el código como usado
        code_ref.update({'usado': True})

        # Crear usuario con Firebase Authentication
        user = auth.create_user(
            email=email,
            password=password
        )

        # Guardar información adicional en Firestore
        user_ref = db.collection('users').document(user.uid)
        user_ref.set({
            'nombre': nombre,
            'email': email,
            'role': 'sin_rol'
        })

        return jsonify({"message": "Usuario creado exitosamente"}), 201

    except Exception as e:
        print(f"Error en registro: {str(e)}")  # Log para depuración
        return jsonify({"error": str(e)}), 400

@app.route('/verify-token', methods=['POST'])
def verify_token():
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        print(f"Token verificado: {decoded_token}")  # Log para depuración

        # Obtener información adicional del usuario desde Firestore
        uid = decoded_token["uid"]
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()

        if user_doc.exists:
            user_data = user_doc.to_dict()
            return jsonify({"uid": uid, "role": user_data.get("role"), "email": user_data.get("email")}), 200
        else:
            return jsonify({"error": "Usuario no encontrado en Firestore"}), 404

    except jwt.ExpiredSignatureError:
        print("Token expirado")  # Log para depuración
        return jsonify({"error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        print("Token inválido")  # Log para depuración
        return jsonify({"error": "Token inválido"}), 401

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
