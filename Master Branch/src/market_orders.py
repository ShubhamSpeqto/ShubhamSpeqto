# -*- coding: utf-8 -*-
"""create order demo.
demonstrates:
- placing a market order
- placing a faulty market order
- logging
"""
import json
from oandapyV20 import API
import oandapyV20.endpoints.orders as orders
from oandapyV20.exceptions import V20Error
import oandapyV20.endpoints.trades as trades
from exampleauth import exampleAuth
import logging
# import oandapyV20.API
# from order_api import fetch_data,save_data,save_traid_id



logging.basicConfig(
    filename="log.out",
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s : %(message)s',
)

accountID, token = exampleAuth()
# data,response_data=fetch_data()

def order_place(created_order,c):
  traid_id=''
  api = API(access_token=token)

  # create and process order requests

  r = orders.OrderCreate(accountID=accountID, data=created_order)
  print("processing : {}".format(r))
  print("===============================")
  print(r.data)
  try:
      response = api.request(r)
  except V20Error as e:
      print("V20Error: {}".format(e))
  else:
      print("Response: {}\n{}".format(r.status_code,
                                        json.dumps(response, indent=2)))
      if c==0:
        traid_id+=response["orderFillTransaction"]['tradeOpened']["tradeID"]   

      # save_data(response)
      # save_traid_id(response,ticksConf[O])
  return traid_id 

def trade_close(tradeID):
  client = API(access_token=token)
  r=trades.TradeClose(accountID=accountID,tradeID=tradeID)
  client.request(r)
  print(r.response)



# market_data,stop_data,maketIfTouched_data,TakeProfit_data,Limit_data,stop_loss_data,Trailing_data,Guaranteed_data=[],[],[],[],[],[],[],[]
order,conditional_order,ticks_id=[],[],[]
def get_order(data):
  for single in data:

    if (single['type']=="MARKET"):
        orderConf=[{'order':{
          'units':single['units'],
          'instrument':single['instrument'],
          'timeInForce':single['timeInForce'],
          'type':single['type'],
          'positionFill':single['positionFill']}}]
        ticks_id.append(single['id'])

        order.extend(orderConf)


    elif(single['type']=="STOP"):
      orderConf=[{'order':{
          'units':single['units'],
          'instrument':single['instrument'],
          'timeInForce':single['timeInForce'],
          'type':single['type'],
          'positionFill':single['positionFill'],
          'price':single['price'],
          'triggerCondition':single['OrderTriggerCondition']}}]
      order.extend(orderConf)
      ticks_id.append(data['id'])




    elif(single['type']=="MARKET_IF_TOUCHED"):
      orderConf=[{'order':{
          'units':single['units'],
          'instrument':single['instrument'],
          'timeInForce':single['timeInForce'],
          'type':single['type'],
          'positionFill':single['positionFill'],
          'price':single['price'],
          'triggerCondition':single['OrderTriggerCondition']}}]
      order.extend(orderConf)
      ticks_id.append(data['id'])




    
    elif(single['type']=="LIMIT"):
      orderConf=[{'order':{
          'units':single['units'],
          'instrument':single['instrument'],
          'timeInForce':single['timeInForce'],
          'type':single['type'],
          'positionFill':single['positionFill'],
          'price':single['price'],
          'triggerCondition':single['OrderTriggerCondition']
           }}]
      order.extend(orderConf)
      ticks_id.append(data['id'])

  return order,ticks_id


def conditional(data,traid_id):

  c=1
  price=data['Comb_price'].split(',')
  trigger=data['comb_triggercondition'].split(',')
  types=data['Comb_type'].split(',')
  timeinforce=data['Comb_timeInForce'].split(',')
  for i in range(len(types)-1):
    if types[i]=="TRAILING_STOP_LOSS":
      orderConf={'order':{
      'timeInForce':timeinforce[i],
      'type':types[i],
      'tradeID':traid_id,
      'price':price[i],
      'triggerCondition':trigger[i],
      'distance':'0.05'}}
    else:
      orderConf={'order':{
      'timeInForce':timeinforce[i],
      'type':types[i],
      'tradeID':traid_id,
      'price':price[i],
      'triggerCondition':trigger[i]}}
    order_place(orderConf,c)



# created_order,ids=get_order(data)
# for i,O in enumerate(created_order):
#   c=0
#   traid_id=order_place(O,c)
#   conditional(data[i],traid_id)
Stop_order(162514,accountID,data={})
