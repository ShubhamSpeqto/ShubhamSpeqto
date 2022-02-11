# import logging
# from numpy.lib import math
# from freqtrade.strategy.interface import IStrategy
# # from freqtrade.strategy.hyper import IntParameter
# from pandas import DataFrame
# import talib.abstract as ta
import numpy as np
import pandas as pd
# class HalfTrend(IStrategy):

#     # ROI table:
#     minimal_roi = {
#         "0": 0.087,
#         "372": 0.058,
#         "861": 0.029,
#         "2221": 0
#     }

#     # Stoploss:
#     stoploss = -0.265

#     # Trailing stop:
#     trailing_stop = True
#     trailing_stop_positive = 0.05
#     trailing_stop_positive_offset = 0.144
#     trailing_only_offset_is_reached = False

#     timeframe = '1h'

#     startup_candle_count = 100

#     def populate_indicators(self, dataframe: DataFrame, metadata: dict) -> DataFrame:

#         dataframe['HTsignal'] = self.halftrend(dataframe)['HT']

#         return dataframe


#     def populate_buy_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
#         dataframe.loc[
#             (
#                dataframe['HTsignal'] == 'buy'
#             ),
#             'buy'] = 1

#         return dataframe

    # def populate_sell_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
    #     dataframe.loc[
    #         (
    #            (dataframe['HTsignal'] == 'sell') &
    #            (dataframe['volume'] > 0) # There is at least some trading volume
    #         ),
    #         'sell'] = 1

    #     return dataframe

df=pd.read_csv('tradingview.csv')
def halftrend(self, dataframe, period = 100, lookback = 500, amplitude =2): 
    data = dataframe.copy()

    trend = 0
    nextTrend = 0

    h = dataframe['High'].to_numpy()
    l = dataframe['Low'].to_numpy()
    maxLowPrice = l[-1]
    minHighPrice = h[-1]

    prevtrend = 0

    dir = 0
    prevdir = ''

    data['signal'] = ''

    for i in range(len(data)-lookback):
        df = data[i:i+100]

        o = df['Open'].to_numpy()
        h = df['High'].to_numpy()
        l = df['Low'].to_numpy()
        c = df['Close'].to_numpy()

        highPrice = max(h[-amplitude:])
        lowPrice = min(l[-amplitude:])

        highma = SMA(h, 2)[-1]
        lowma =  SMA(l, 2)[-1]

        if nextTrend == 1:
            maxLowPrice = max(lowPrice, maxLowPrice)
            if highma < maxLowPrice and c[-1] < l[-2]:
                trend = 1
                nextTrend = 0
                minHighPrice = highPrice
        else:
            minHighPrice = min(highPrice, minHighPrice)
            if lowma > minHighPrice and c[-1] > h[-2]:
                trend = 0
                nextTrend = 1
                maxLowPrice = lowPrice
            
        buySignal = (trend == 0 and prevtrend == 1)
        sellSignal = (trend == 1 and prevtrend == 0)

        prevtrend = trend

        if buySignal:
            dir = 'buy'
        elif sellSignal:
            dir = 'sell'

        data['signal'].iat[i] = dir if dir != prevdir else ''
    
    return DataFrame(index=df.index, data={
        'HT' : df['signal'],
    })