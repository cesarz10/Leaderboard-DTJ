import os
from datetime import timedelta
from urllib.parse import quote


class Config:
    # # From environment variables "secure way"
    # SECRET_KEY = os.getenv('SECRET_KEY')
    # DATABASE_USERNAME = quote(os.getenv('DATABASE_USERNAME'), safe='')
    # DATABASE_PASSWORD = quote(os.getenv('DATABASE_PASSWORD'), safe='')
    # DATABASE_URL = os.getenv('DATABASE_URL')
    # DATABASE_NAME = quote(os.getenv('DATABASE_NAME'))
    # SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_URL}/{DATABASE_NAME}"
    # REDIS_IP = os.getenv("REDIS_IP")
    # REDIS_PORT = os.getenv("REDIS_PORT")
    # REDIS_USERNAME = os.getenv('REDIS_USERNAME')
    # REDIS_PASSWORD = os.getenv('REDIS_PASSWORD')
    # RATELIMIT_STORAGE_URL = f"redis://{quote(REDIS_USERNAME, safe='')}:{quote(REDIS_PASSWORD, safe='')}@{REDIS_IP}:{REDIS_PORT}"

    # SECRET_KEY = "test"
    DATABASE_USERNAME = "postgres"
    DATABASE_PASSWORD = "cesarz10"
    # DATABASE_URL = "193.190.127.172" # right now it's localhost
    DATABASE_URL = "localhost:5432"
    DATABASE_NAME = "leaderboardDTJ"
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_URL}/{DATABASE_NAME}"
    # REDIS_IP = "193.190.127.172"
    # REDIS_PORT = 6379
    # REDIS_PORT = 5432
    # REDIS_USERNAME = "redis_user"
    # REDIS_PASSWORD ="testingredis123"
    # RATELIMIT_STORAGE_URL = f"redis://{quote(REDIS_USERNAME, safe='')}:{quote(REDIS_PASSWORD, safe='')}@{REDIS_IP}:{REDIS_PORT}"


    # SQLAlchemy configuration
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 100,
        'max_overflow': 200,
        'pool_timeout': 5,
        'pool_recycle': 1800,
        'pool_reset_on_return': 'commit',
        'pool_pre_ping': True
    }

    # Rate limiting configuration
    RATELIMIT_DEFAULT = "200000 per day;100000 per hour"

    # JWT configuration
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_REFRESH_TOKEN_TL_MARGIN = timedelta(days=28)

class DevelopmentConfig(Config):
    DEBUG = True