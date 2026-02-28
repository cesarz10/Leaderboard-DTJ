import os
from datetime import timedelta
from urllib.parse import quote


class Config:
    # SECRET_KEY = "test"
    DATABASE_USERNAME = "postgres"
    DATABASE_PASSWORD = "cesarz10"
    # DATABASE_URL = "193.190.127.172" # right now it's localhost
    DATABASE_URL = "db.pdbjxdlvaqfojdqgtqbr.supabase.co:5432" # this is the URL for the database on Supabase
    # DATABASE_NAME = "leaderboardDTJ"
    DATABASE_NAME = "postgres" # this is the name of the database on Supabase
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_URL}/{DATABASE_NAME}"

    # "postgresql://postgres:[YOUR-PASSWORD]@db.pdbjxdlvaqfojdqgtqbr.supabase.co:5432/postgres"

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