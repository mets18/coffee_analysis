from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pymongo
# import scrape_mars

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/test_coffes")

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    tweets_rec = mongo.db.tweets.find_one()

    print(tweets_rec)
   
    # Return index.html
    return render_template("index.html")
 
# Route that will return aggregated sentiments counts
@app.route("/rating/<cmp>/")
def rating(cmp):

    #Aggregate from Mongodb
    tweets_rec = list(mongo.db.tweets.aggregate(
                 [ 
                    { "$match": { 'company': cmp } },
                    { "$group": { '_id': "$rating" , "No_of_Times": { "$sum": 1 } } }
                 ]
        ))

    sentiments_list = []
    ratings_list = []

    for tweet in tweets_rec:
        sentiments_list.append(tweet['_id'])
        ratings_list.append(tweet['No_of_Times'])

    return_json =  { 
                     "company" : cmp , 
                     "sentiments" : sentiments_list, 
                     "ratings" : ratings_list
                   }

    #Return json 
    return jsonify(return_json)

# Route that will return recent tweets
@app.route("/metadata/<cmp>/")
def metadata(cmp):

    sample_metadata = {}

    metadata_rec = mongo.db.tweets.find( { 'company': cmp } ).sort([("time", -1)]).limit(3)
    
    for tweet in metadata_rec:        
        tim=tweet['time']        
        sample_metadata[tim] = tweet['tweet']        
        
    return jsonify(sample_metadata)

if __name__ == "__main__":
    app.run(debug=True)
