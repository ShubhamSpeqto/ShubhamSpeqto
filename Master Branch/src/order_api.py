
#Importing Libraries
#from typing_extensions import ParamSpecArgs
from flask import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from datetime import datetime
from flask import jsonify





app = Flask(__name__) #Creating an obj of flask app


db = SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI'] = ('postgresql://postgres:12345678@localhost:5432/botdb')
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

class ticks(db.Model):
    
    __tablename__ = 'Ticks'  # creating a table name
    
    id = db.Column(db.Integer, primary_key=True)  # this is the primary key
    created_by= db.Column(db.String(80), nullable=False)
    accountID=db.Column(db.String(25))
    created_date=db.Column(db.DateTime(),nullable=False)
    updated_by=db.Column(db.String(80))
    updated_date=db.Column(db.DateTime())
    status=db.Column(db.String(6))
    
#     # order
    price=db.Column(db.Float, nullable=True)
    timeInForce=db.Column(db.String(80), nullable=False)
    instrument=db.Column(db.String(20), nullable=False)
    units=db.Column(db.Integer, nullable=False)
    type=db.Column(db.String(50), nullable=True)
    positionFill=db.Column(db.String(50), nullable=True)
    OrderTriggerCondition=db.Column(db.String(45))
    trade_id=db.Column(db.String(10),nullable=True)
    Comb_timeInForce=db.Column(db.String(20),nullable=True)
    Comb_price=db.Column(db.String(50),nullable=True)
    Comb_type=db.Column(db.String(80),nullable=True)
    comb_triggercondition=db.Column(db.String(80),nullable=True)


    def json(self):
        return {'id': self.id,'accountID': self.accountID,'created_by': self.created_by,'created_date': self.created_date,'updated_by': self.updated_by,'updated_date': self.updated_date,'status': self.status,'price': self.price,'timeInForce': self.timeInForce,'instrument': self.instrument,'units': self.units,'type': self.type,'positionFill': self.positionFill,'OrderTriggerCondition':self.OrderTriggerCondition,'trade_id':self.trade_id,'Comb_timeInForce':self.Comb_timeInForce,'Comb_price':self.Comb_price,'Comb_type':self.Comb_type,'comb_triggercondition':self.comb_triggercondition}

    def create(self):
       db.session.add(self)
       db.session.commit()
       return self

    def get_all_order():
        return [ticks.json(Ticks) for Ticks in ticks.query.all()]

class Response(db.Model):
    __tablename__="Response_data"
    id = db.Column(db.Integer, primary_key=True)
    accountID=db.Column(db.String(30),nullable=True)
    userID=db.Column(db.String(30),nullable=True)
    batchID=db.Column(db.Integer,nullable=True)
    requestID=db.Column(db.Float,nullable=True)
    time=db.Column(db.DateTime(),nullable=True)
    Order_Create_type=db.Column(db.String(20),nullable=True)
    instrument=db.Column(db.String(20),nullable=True)
    units=db.Column(db.Integer,nullable=True)
    TimeInForce=db.Column(db.String(20),nullable=True)
    PositionFill=db.Column(db.String(20),nullable=True)
    Reason=db.Column(db.String(20),nullable=True)
    OrderFill_ID=db.Column(db.String(20),nullable=True)
    OrderFill_accountID=db.Column(db.String(20),nullable=True)
    OrderFill_userID=db.Column(db.String(20),nullable=True)
    OrderFill_batchID=db.Column(db.String(20),nullable=True)
    OrderFill_requestID=db.Column(db.String(30),nullable=True)
    OrderFill_time=db.Column(db.DateTime(),nullable=True)
    OrderFill_type=db.Column(db.String(20),nullable=True)
    OrderFill_orderID=db.Column(db.Integer,nullable=True)
    OrderFill_Instrument=db.Column(db.String(10),nullable=True)
    OrderFill_units=db.Column(db.Integer,nullable=True)
    OrderFill_price=db.Column(db.Float,nullable=True)
    OrderFill_pl=db.Column(db.Float,nullable=True)
    OrderFill_financing=db.Column(db.Float,nullable=True)
    OrderFill_baseFinancing=db.Column(db.Float,nullable=True)
    OrderFill_commision=db.Column(db.Float,nullable=True)
    OrderFill_accountBalance=db.Column(db.Float,nullable=True)
    OrderFill_gainQuoteHomeConversionFactor=db.Column(db.Float,nullable=True)
    OrderFill_lossQuoteHomeConversionFactor=db.Column(db.Float,nullable=True)
    OrderFill_guaranteedExecutionFee=db.Column(db.Float,nullable=True)
    OrderFill_quoteGuaranteedExecutionFee=db.Column(db.Float,nullable=True)
    OrderFill_halfSpreadCost=db.Column(db.Float,nullable=True)
    OrderFill_fullVWAP=db.Column(db.Float,nullable=True)
    OrderFill_reason=db.Column(db.String(20),nullable=True)
    tradeOpened_price=db.Column(db.Float,nullable=True)
    tradeOpened_tradeID=db.Column(db.Integer,nullable=True)
    tradeOpened_units=db.Column(db.Integer,nullable=True)
    tradeOpened_guaranteedExecutionFee=db.Column(db.Float,nullable=True)
    tradeOpened_quoteGuaranteedExecutionFee=db.Column(db.Float,nullable=True)
    tradeOpened_halfSpreadCost=db.Column(db.Float,nullable=True)
    tradeOpened_initialMarginRequired=db.Column(db.Float,nullable=True)
    tradeOpened_closeoutBid=db.Column(db.Float,nullable=True)
    tradeOpened_closeoutAsk=db.Column(db.Float,nullable=True)

    def get_all():
        return [i for i in Response.query.all()]




def save_data(response):
    new_data=Response(accountID=response['orderCreateTransaction']['accountID'],
    userID=response['orderCreateTransaction']['userID'],
    batchID=response['orderCreateTransaction']['batchID'],
    requestID=response['orderCreateTransaction']['requestID'],
    time=response['orderCreateTransaction']['time'],
    Order_Create_type=response['orderCreateTransaction']['type'],
    instrument=response['orderCreateTransaction']['instrument'],
    units=response['orderCreateTransaction']['units'],
    TimeInForce=response['orderCreateTransaction']['timeInForce'],
    PositionFill=response['orderCreateTransaction']['positionFill'],
    Reason=response['orderCreateTransaction']['reason'],
    OrderFill_ID=response['orderFillTransaction']['id'],
    OrderFill_accountID=response['orderFillTransaction']['accountID'],
    OrderFill_userID=response['orderFillTransaction']['userID'],
    OrderFill_batchID=response['orderFillTransaction']['batchID'],
    OrderFill_requestID=response['orderFillTransaction']['requestID'],
    OrderFill_time=response['orderFillTransaction']['time'],
    OrderFill_type=response['orderFillTransaction']['type'],
    OrderFill_orderID=response['orderFillTransaction']['orderID'],
    OrderFill_Instrument=response['orderFillTransaction']['instrument'],
    OrderFill_units=response['orderFillTransaction']['units'],
    OrderFill_price=response['orderFillTransaction']['price'],
    OrderFill_pl=response['orderFillTransaction']['pl'],
    OrderFill_financing=response['orderFillTransaction']['financing'],
    OrderFill_baseFinancing=response['orderFillTransaction']['baseFinancing'],
    OrderFill_commision=response['orderFillTransaction']['commission'],
    OrderFill_accountBalance=response['orderFillTransaction']['accountBalance'],
    OrderFill_gainQuoteHomeConversionFactor=response['orderFillTransaction']['gainQuoteHomeConversionFactor'],rderTriggerCondition" of relation "Ticks" does not exist
    OrderFill_lossQuoteHomeConversionFactor=response['orderFillTransaction']['lossQuoteHomeConversionFactor'],
    OrderFill_guaranteedExecutionFee=response['orderFillTransaction']['guaranteedExecutionFee'],
    OrderFill_quoteGuaranteedExecutionFee=response['orderFillTransaction']['quoteGuaranteedExecutionFee'],
    OrderFill_halfSpreadCost=response['orderFillTransaction']['halfSpreadCost'],
    OrderFill_fullVWAP=response['orderFillTransaction']['fullVWAP'],
    OrderFill_reason=response['orderFillTransaction']['reason'],
    tradeOpened_price=response['orderFillTransaction']['tradeOpened']['price'],
    tradeOpened_tradeID=response['orderFillTransaction']['tradeOpened']['tradeID'],
    tradeOpened_units=response['orderFillTransaction']['tradeOpened']['units'],
    tradeOpened_guaranteedExecutionFee=response['orderFillTransaction']['tradeOpened']['guaranteedExecutionFee'],
    tradeOpened_quoteGuaranteedExecutionFee=response['orderFillTransaction']['tradeOpened']['quoteGuaranteedExecutionFee'],
    tradeOpened_halfSpreadCost=response['orderFillTransaction']['tradeOpened']['halfSpreadCost'],
    tradeOpened_initialMarginRequired=response['orderFillTransaction']['tradeOpened']['initialMarginRequired'],
    tradeOpened_closeoutBid=response['orderFillTransaction']['fullPrice']['closeoutBid'],
    tradeOpened_closeoutAsk=response['orderFillTransaction']['fullPrice']['closeoutAsk']
     )
    db.session.add(new_data)
    db.session.commit()

def save_traid_id(response,id):
    if response['orderCreateTransaction']['type']=='LIMIT_ORDER'or response['orderCreateTransaction']['type']=='MARKET_IF_TOUCHED_ORDER':
        traid_id=response['lastTransactionID']
    else:
        traid_id=response['orderFillTransaction']['tradeOpened']['tradeID']
    for Ticks in ticks.query.all():
        if Ticks.id==id:
            print(traid_id)
            Ticks.trade_id=traid_id
            db.session.add(Ticks)
            db.session.commit()

def fetch_data():
    data=ticks.get_all_order()
    response_data=Response.get_all()
    return data,response_data



#To Add New Data
# @app.route('/v3/accounts/{accountID}/orders', methods=['POST'])

@app.route('/v3/accounts/orders', methods=['POST'])
def add_data():
    '''Function to add new data to our database'''
    comb_type,comb_price,comb_timeinforce,comb_trigger='','','',''
    bot_data = request.get_json()  # getting data from client
    if bot_data['stop_loss']!={}:
        comb_type+=bot_data['stop_loss']['type']+','
        comb_timeinforce+=bot_data['stop_loss']["timeInForce"]+','
        comb_price+=bot_data['stop_loss']["price"]+','
        comb_trigger+=bot_data['stop_loss']["ProfitTriggerCondition"]+','
    if bot_data['trailing_stop_loss']!={}:
        comb_type+=bot_data['trailing_stop_loss']['type']+','
        comb_timeinforce+=bot_data['trailing_stop_loss']["timeInForce"]+','
        comb_price+=bot_data['trailing_stop_loss']["price"]+','
        comb_trigger+=bot_data['trailing_stop_loss']["ProfitTriggerCondition"]+','

    if bot_data['guaranteed_stop_loss']!={}:
        comb_type+=bot_data['guaranteed_stop_loss']['type']+','
        comb_timeinforce+=bot_data['guaranteed_stop_loss']["timeInForce"]+','
        comb_price+=bot_data['guaranteed_stop_loss']["price"]+','
        comb_trigger+=bot_data['guaranteed_stop_loss']["ProfitTriggerCondition"]+','
    if bot_data['take_profit']!={}:
        comb_type+=bot_data['take_profit']['type']+','
        comb_timeinforce+=bot_data['take_profit']["timeInForce"]+','
        comb_price+=bot_data['take_profit']["price"]+','
        comb_trigger+=bot_data['take_profit']["ProfitTriggerCondition"]+','
    new_data=ticks(comb_triggercondition=comb_trigger,Comb_price=comb_price,Comb_timeInForce=comb_timeinforce,Comb_type=comb_type,created_by=bot_data["created_by"],created_date=datetime.now(),accountID=bot_data["accountID"],timeInForce=bot_data["timeInForce"],units=bot_data["units"],type=bot_data["type"],positionFill=bot_data["positionFill"],instrument=bot_data["instrument"],status=bot_data["status"],OrderTriggerCondition=bot_data['OrderTriggerCondition'],price=bot_data["price"])
    db.session.add(new_data)
    db.session.commit()
    return jsonify({"Data Are added":bot_data,"status":200})


        # new_data=ticks(created_by=bot_data["created_by"],created_date=datetime.now(),accountID=bot_data["accountID"],timeInForce=bot_data["timeInForce"],units=bot_data["units"],type=bot_data["type"],positionFill=bot_data["positionFill"],instrument=bot_data["instrument"],status=bot_data["status"])
        # db.session.add(new_data)
        # db.session.commit()
    # else:

    #     new_data =ticks(comb_triggercondition=comb_trigger,Comb_price=comb_price,Comb_timeInForce=comb_timeInforce,Comb_type=comb_type,created_by=bot_data["created_by"],created_date=datetime.now(),accountID=bot_data["accountID"],price=bot_data["price"],timeInForce=bot_data["timeInForce"],units=bot_data["units"],type=bot_data["type"],positionFill=bot_data["positionFill"],instrument=bot_data["instrument"],status=bot_data["status"],OrderTriggerCondition=bot_data['OrderTriggerCondition'])
    #     db.session.add(new_data)  # add new data to database session
    #     db.session.commit()  # commit changes to session
    #     return jsonify({"Data Are added":bot_data,"status":200})





if __name__=="__main__":
    db.create_all() #One time run to create table 
    app.run(debug=True)

