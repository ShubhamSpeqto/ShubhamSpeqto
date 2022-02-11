#Importing Libraries
from flask import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from datetime import datetime
from flask import jsonify
# from market_orders import get_order


app = Flask(__name__) #Creating an obj of flask app


db = SQLAlchemy(app)
# accountID=31223

# app.config['SQLALCHEMY_DATABASE_URI'] = ('postgresql://postgres:12345@localhost:5432/botdb')
app.config['SQLALCHEMY_DATABASE_URI'] = ('postgresql://postgres:12345678@localhost:5432/botdb')
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

class ticks(db.Model):
    #Creating Table
    __tablename__ = 'Ticks'  # creating a table name
    id = db.Column(db.Integer, primary_key=True)  # this is the primary keydatetime
    created_by= db.Column(db.String(80), nullable=False)
    accountID=db.Column(db.String(25))
    created_date=db.Column(db.DateTime(),nullable=False)
    updated_by=db.Column(db.String(80))
    updated_date=db.Column(db.DateTime())
    status=db.Column(db.String(6))
    price=db.Column(db.Float, nullable=False)
    timeInForce=db.Column(db.String(80), nullable=False)
    instrument=db.Column(db.String(20), nullable=False)
    units=db.Column(db.Integer, nullable=False)
    type=db.Column(db.String(50), nullable=False)
    positionFill=db.Column(db.String(50), nullable=False)
    OrderTriggerCondition=db.Column(db.String(10))
    stop_order_price=db.Column(db.Float)
    trade_id=db.Column(db.Integer)
    distance=db.Column(db.Float)

    def json(self):
        return {'id': self.id,'accountID': self.accountID,'created_by': self.created_by,'created_date': self.created_date,'updated_by': self.updated_by,'updated_date': self.updated_date,'status': self.status,'price': self.price,'timeInForce': self.timeInForce,'instrument': self.instrument,'units': self.units,'type': self.type,'positionFill': self.positionFill,'OrderTriggerCondition':self.OrderTriggerCondition,'stop_order_price':self.stop_order_price,'trade_id':self.trade_id,'distance':self.distance}

    def create(self):
       db.session.add(self)
       db.session.commit()
       return self

    def get_all_order():
        return [ticks.json(Ticks) for Ticks in ticks.query.all()]


#To Add New Data
# @app.route('/v3/accounts/{accountID}/orders', methods=['POST'])
@app.route('/v3/accounts/orders', methods=['POST'])
def add_data():
    '''Function to add new data to our database'''
    bot_data = request.get_json()  # getting data from client
    new_data =ticks(created_by=bot_data["created_by"],created_date=datetime.now(),accountID=bot_data["accountID"],price=bot_data["price"],timeInForce=bot_data["timeInForce"],units=bot_data["units"],type=bot_data["type"],positionFill=bot_data["positionFill"],instrument=bot_data["instrument"],status=bot_data["status"],OrderTriggerCondition=bot_data['OrderTriggerCondition'],stop_order_price=bot_data['stop_order_price'],trade_id=bot_data['trade_id'],distance=bot_data['distance'])
    db.session.add(new_data)  # add new data to database session
    db.session.commit()  # commit changes to session
    return jsonify({"Data Are added":bot_data,"status":200})

# To Fetch Data
@app.route('/v3/accounts/orders/get_data',methods=['GET'])
def fetch_data():
#function to get data using the id of the botdb as parameter
        return jsonify({'Orders':ticks.get_all_order()})
        # ticks.json() coverts our output to the json format defined earlier
        # the filter_by method filters the query by the id
        # since our id is unique we will only get one result
        # the .first() method will get that first value returned


if __name__=="__main__":
    #db.create_all() #One time run to create table 
    app.run(debug=True)
    
    