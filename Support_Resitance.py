# import pandas as pd
# import numpy as np


# df=pd.read_csv("tradingview.csv")


# def isSupport(df,i):
#     for j in range(i):
#         support = df['Low'][i] < df['Low'][i-1]  and df['Low'][i] < df['Low'][i+1] and df['Low'][i+1] < df['Low'][i+2] and df['Low'][i-1] < df['Low'][i-2]  
#         return support
# def isResistance(df,i):
#   resistance = df['High'][i] > df['High'][i-1]  and df['High'][i] > df['High'][i+1] and df['High'][i+1] > df['High'][i+2] and df['High'][i-1] > df['High'][i-2]  
#   return resistance
# print(df["Low"][4])

# # levels = []
# # for i in range(2,df.shape[0]-2):
# #   if isSupport(df,i):
# #     levels.append((i,df['Low'][i]))
# #   elif isResistance(df,i):
# #     levels.append((i,df['High'][i]))


import pandas as pd
df = pd.read_csv("EURUSD_Candlestick_1_D_ASK_05.05.2003-30.06.2021.csv")
#Check if NA values are in data
df=df[df['volume']!=0]
df.reset_index(drop=True, inplace=True)
df.isna().sum()
# df.tail()

def support(df1, l, n1, n2): #n1 n2 before and after candle l
    for i in range(l-n1+1, l+1):
        if(df1.low[i]>df1.low[i-1]):
            return 0
    for i in range(l+1,l+n2+1):
        if(df1.low[i]<df1.low[i-1]):
            return 0
    return 1

#support(df,46,3,2)

def resistance(df1, l, n1, n2): #n1 n2 before and after candle l
    for i in range(l-n1+1, l+1):
        if(df1.high[i]<df1.high[i-1]):
            return 0
    for i in range(l+1,l+n2+1):
        if(df1.high[i]>df1.high[i-1]):
            return 0
    return 1
#resistance(df, 30, 3, 5)