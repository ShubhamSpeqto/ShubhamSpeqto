# from typing import Type
# import numpy as np
import pandas as pd

# from Bot_API_and_Indicator.Strtgy_Scalp_HT import File_path
# import datetime as dt


def ATRCal(df,window_length,PrevATR):
    high_low=[]
    high_close=[]
    low_close=[]
    TR=[]
    ATR=[]
    

    for i in range(len(df)):
        
        if i==0:
            high_low.append(df['High'][i] - df['Low'][i])
            high_close.append(0)
            low_close.append(0)
            TR.append(high_low[i])
            ATR.append(PrevATR)
            continue 
        high_low.append(df['High'][i] - df['Low'][i])
        high_close.append(abs(df['High'][i] - df['Close'][i-1]))
        low_close.append(abs(df['Low'][i] - df['Close'][i-1]))
        TR.append(max(high_low[i],high_close[i],low_close[i]))
        # print(TR)
        ATR.append(round(((ATR[i-1]*(window_length-1))+TR[i])/window_length,6)) 

    df["ATR"]=ATR
    # df["TR"]=TR 
    return df
    


def EMA_cal(df,Length,PrevEMA,Price):
    EMA=[PrevEMA]
    for i in range(len(df)):
        if i==0:
            continue
        ema=(df[Price][i]*(2/(Length+1)))+(PrevEMA*(1-(2/(Length+1))))
        EMA.append(round(ema,4))
        PrevEMA=ema
    df["EMA"]=EMA
    return df


def RSIcalculator(df,window_length):
    df = pd.read_csv(File_path)
    Price_list = df["Open"].tolist()
    #Define our Lookback period (our sliding window)
    #Initialize containers for avg. gains and losses
    gains = []
    losses = []
    #Create a container for current lookback prices
    window = []
    #Keeps track of previous average values
    prev_avg_gain = None
    prev_avg_loss = None
    # Create a container for our final output (as a csv)
    output = [['Index', 'Open', 'gain', 'loss', 'avg_gain', 'avg_loss', 'rsi']]

    # Loop through an enumerated set of our data
    # to keep track of which period we are currently
    # making calculations for RSI
    for i, price in enumerate(Price_list):
        # keep track of the price for the first period
        # but don't calculate a difference value.
        if i == 0:
            window.append(price)
            output.append([i+1, price, 0, 0, 0, 0, 0])
            continue
        # After the first period, calculate the difference
        # between price and previous price as a rounded value
        # print(float(data[i-1]),float(data[i]))
        difference=(Price_list[i])-(Price_list[i-1])
        # difference = round(data[i]-data[i-1],2)
        # print(difference)
        # Record positive differences as gains
        if difference > 0:
            gain = difference
            loss = 0

        # Record negative differences as losses
        elif difference < 0:
            gain = 0
            loss = abs(difference)
        
        # Record no movements as neutral
        else:
            gain = 0
            loss = 0
        # Save gains/losses
        gains.append(gain)
        losses.append(loss)
        # Continue to iterate until enough
        # gains/losses data is available to 
        # calculate the initial RS value

        if i < window_length:
            window.append(price)
            output.append([i+1, price, gain, loss, 0, 0, 0])
            continue

        # Calculate SMA for first gain
        if i == window_length:
            avg_gain = sum(gains) / len(gains)
            avg_loss = sum(losses) / len(losses)
            # print(gains,avg_gain)
            

    #     # Use WSm after initial window-length period
        else:
            avg_gain = (prev_avg_gain * (window_length - 1) + gain) / window_length
            avg_loss = (prev_avg_loss * (window_length - 1) + loss) / window_length
    #     # Keep in memory
        prev_avg_gain = avg_gain
        prev_avg_loss = avg_loss
    #     # Round for later comparison (optional)



        # use avg. gains and losses to calculate
        # the RS value rounded to the nearest 
        # 2 decimal places
        rs = avg_gain / avg_loss
        # use the RS value to calculate the 
        # RSI to the nearest 2 decimal places
        rsi = 100 - (100 / (1 + rs))

        # Remove oldest values
        window.append(price)
        window.pop(0)
        gains.pop(0)
        losses.pop(0)
        # Save Data
        output.append([i+1, price, gain, loss, avg_gain, avg_loss, rsi])

    #Merging & Storing in new csv file
    Gains=[]
    Loss=[]
    Avg_Gain=[]
    Avg_Loss=[]
    RSI_Data=[]
    c=0

    for i in output:
        if c==0:
            c=1
            continue
        Gains.append(i[2])
        Loss.append(i[3])
        Avg_Gain.append(i[4])
        Avg_Loss.append(i[5])
        RSI_Data.append(i[6])
    df["Gain"],df["Loss"],df["Avg_Gain"],df["Avg_Loss"],df["RSI"]=Gains,Loss,Avg_Gain,Avg_Loss,RSI_Data
    # df.to_csv(File_path)
    return df


def Vwap_Calculator(df):
    # print(df.head())
    # List Variables where store our column data
    Typical_price=[]
    cum_avg=[]
    cum_vol=[]
    VWAP=[]
    # Calculating Average/Typical price
    #Some initial declaration to store data partially
    # prev_cum_avg=0
    for i in range(len(df)):  
        lst=[]
        lst.append(df["High"][i])
        lst.append(df["Low"][i])
        lst.append(df["Close"][i])
        Typical_price.append(sum(lst)/3)
        lst.clear()
        
        # Calculating cumulative average price
        if i==0:
            data=df["Volume"][i]*Typical_price[i]
            cum_avg.append(data)
        else:
            data=(cum_avg[i-1]+(Typical_price[i]*df["Volume"][i]))
            cum_avg.append(data)

        #Calculating cumulative total volume
        if i==0:
            cum_vol.append(df["Volume"][i])
        else:
            cum_vol.append(df["Volume"][i]+cum_vol[i-1])

        #Calculating VWAP
        VWAP.append(cum_avg[i]/cum_vol[i])

    df['Typical_price'],df['cum_avg'],df['cum_vol'],df['VWAP']=Typical_price,cum_avg,cum_vol,VWAP
    return df


if __name__=="__main__":
    File_path=""
    df = pd.read_csv(File_path)