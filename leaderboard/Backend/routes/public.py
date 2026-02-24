import re
import json 
from flask import jsonify
from flask import request
from sqlalchemy import text
from flask import Blueprint#, current_app
from flask_jwt_extended import jwt_required

 
from app import db#, limiter
# from flask_cors import cross_origin
from models.user_data.user_data import UserData # need this for adding stuff to the database
 
userdata = Blueprint('userdata', __name__)
 
 
# ------------------------------------ USER DATA ------------------------------------

# function to get all question_answers from the database for a specific user -> called from the dashboard to show the user userdata
@userdata.route('/get/user_data', methods=['GET'])
# @jwt_required()
def get_data():
    query = text("""
    SELECT * FROM user_data
    WHERE created_at >= date_trunc('month', now()) 
    AND created_at < date_trunc('month', now()) + interval '1 month';
    """) 
         

    userAnswers = db.session.execute(query).fetchall() # execute the query and fetch all results (even the 'duplicated' ones)

    answers_arr = [] # empty array to store the data
    for i in range(len(userAnswers)): # iterating over the data from this month
        answers_arr.append({
            "name": userAnswers[i].name,
            "score": userAnswers[i].score,
            "created_at": userAnswers[i].created_at,
        })

    answers_arr = jsonify(answers_arr)

    return answers_arr, 200 # 200: OK -> everything went well

