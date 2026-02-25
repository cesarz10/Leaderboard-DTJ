from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config, DevelopmentConfig
from extensions import db

# db = SQLAlchemy()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


    from routes import init_app
    init_app(app)

    db.init_app(app)

    return app

if __name__ == '__main__':
    app = create_app(DevelopmentConfig) # Use DevelopmentConfig by default
    app.run(debug=True, port=5000)
    print("Flask backend is running on http://localhost:5000!")








# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from datetime import date
# from flask_cors import CORS
# import jwt
# from config import Config, DevelopmentConfig

# # app = Flask(__name__)

# # required_env_vars = ['SECRET_KEY', 'DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_URL', 'DATABASE_NAME',
# #                      "REDIS_IP", "REDIS_PORT", "REDIS_USERNAME", "REDIS_PASSWORD"]

# # required_env_vars = ['SECRET_KEY', 'DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_URL', 'DATABASE_NAME']
# # Format: postgresql://username:password@localhost:5432/database_name
# # app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
# # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy()

# def create_app(config_class=Config):
#     app = Flask(__name__)
#     app.config.from_object(config_class)
#     # CORS(app)
#     CORS(app, resources={r"/*": {"origins": "http://localhost:8081"}}, supports_credentials=True)


#     from routes import init_app
#     init_app(app)

#     db.init_app(app)

#     return app

# if __name__ == '__main__':
#     app = create_app(DevelopmentConfig) # Use DevelopmentConfig by default
#     app.run(debug=True, port=5000)
#     print("Flask backend is running on http://localhost:5000!")