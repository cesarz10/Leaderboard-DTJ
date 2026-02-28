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