from sqlalchemy import Column, ForeignKey, Boolean, TIMESTAMP, Integer, VARCHAR, Numeric
# from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func, text
 
from app import db
 
 
class UserData(db.Model):
    __table_args__ = {'schema': 'public'}
    name = Column(VARCHAR(255), primary_key=True, nullable=False)
    score = Column(Numeric, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now(), primary_key=True,nullable=True)
    