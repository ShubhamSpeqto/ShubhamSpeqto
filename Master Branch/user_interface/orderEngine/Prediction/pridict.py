import datetime
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
from IPython.core.display import display

from sklearn.ensemble import GradientBoostingClassifier

from sklearn import ensemble

h = pd.read_csv('USDCAD_Candlestick_1_Hour_BID_31.12.2015-31.05.2018.csv')
o = pd.read_csv('BRENT.CMDUSD_Candlestick_1_Hour_BID_31.12.2014-31.05.2018.csv')

# Put USD/CAD hour data into Pandas Dataframe
df = pd.DataFrame(h)
display(df.head())
display(df.tail())

# Oil data
df_oil = pd.DataFrame(o)
display(df_oil.head())
display(df_oil.tail())

# Set the date as datetime
df['datetime'] = pd.to_datetime(df['Gmt time'])

df = df.set_index(df['datetime'])
df.index.names = [None]

# Set datetime for oil
df_oil['datetime'] = pd.to_datetime(df_oil['Gmt time'])
df_oil = df_oil.set_index(df_oil['datetime'])
df_oil.index.names = [None]

df_oil = df.loc[:,['Open', 'High', 'Low', 'Close', 'Volume']]
df_oil = df_oil.rename(columns={'Open': 'Open_oil', 'High': 'High_oil', 'Low':'Low_oil', 'Close':'Close_oil', 'Volume':'Volume_oil'})
df_oil.tail()

# Just some exploration
df['Close'].plot()

df_oil['Close_oil'].plot()


# Create return (open-close) normalized

df['return_next'] = df['Open'].shift(-1) - df['Close'].shift(-1)
return_range = df['return_next'].max() - df['return_next'].min()
df['return_next'] = df['return_next'] / return_range

df['return'] = df['Open'] - df['Close']
return_range = df['return'].max() - df['return'].min()
df['return'] = df['return'] / return_range

# If return > 0, green; otherwise, red
df['return'].plot()


# Make label, 1 as rising price, 0 as falling price - prediction for the following timestamp
# ****************** consider when return ==0 next version
df['label'] = df['return_next'].apply(lambda x: 1 if x>0.0 else 0)
df.tail(10)

# The last register shows a NaN
df.dropna(inplace=True)
df.tail()

df2 = df.copy()
df = df.loc[:,['Open', 'High', 'Low', 'Close', 'Volume', 'return', 'label']]
df.tail()

df = pd.concat([df,df_oil],axis=1, join='inner')
df.head()


# Creating datetime features
df['year'] = df.index.year
df['month'] = df.index.month
df['day'] = df.index.day
df['hour'] = df.index.hour
df.head()

df.dtypes
# we have to change the volume type later


# Limiting the dataframe: from 3:00 to 12:00 (10 timestamps)
df = df.between_time(include_start=True,include_end=True, start_time='03:00:00', end_time='12:00:00')
df.tail(20)

# Make training and test dataset
df_test = df.loc['2018-05-31' ,:]
display(df_test.head())
display(df_test.tail())
df_train = df.loc[:'2018-05-30',:]
display(df_train.head())
display(df_train.tail())

df_train.columns

# Separate features and output

y_train = df_train['label']
X_train = df_train.loc[:,['Open', 'High', 'Low', 'Close', 'Volume', 'return', 'Open_oil', 'High_oil', 'Low_oil', 'Close_oil', 'Volume_oil',
       'year', 'month', 'day', 'hour']]
y_test = df_test['label']
X_test = df_test.loc[:,['Open', 'High', 'Low', 'Close', 'Volume', 'return', 'Open_oil', 'High_oil', 'Low_oil', 'Close_oil', 'Volume_oil',
       'year', 'month', 'day', 'hour']]


print(X_test.shape)
print(y_test.shape)
print('%% of Class0 : %f y_test' % (np.count_nonzero(y_test == 0)/float(len(y_test))))
print('%% of Class1 : %f y_test' % (np.count_nonzero(y_test == 1)/float(len(y_test))))


print(X_train.shape)
print(y_train.shape)
print('%% of Class0 : %f y_train' % (np.count_nonzero(y_train == 0)/float(len(y_train))))
print('%% of Class1 : %f y_train' % (np.count_nonzero(y_train == 1)/float(len(y_train))))


# Define Model and fit
clf = ensemble.GradientBoostingClassifier(verbose=3)
clf.fit(X_train, y_train)

accuracy = clf.score(X_train, y_train)
print('Testing Accuracy: %f' % accuracy)

# Predict test data
pred = clf.predict(X_test)


# Comparing predicted and label

df_trade = pd.DataFrame(X_test)
df_trade['label']  = y_test
df_trade['pred']   = pred
df_trade['won']    = df_trade['label'] == df_trade['pred']
df_trade


# Didnt won and won
print(df_trade[df_trade['won'] == False]['won'].count())
print(df_trade[df_trade['won'] == True]['won'].count())

# % of won
df_trade[df_trade['won'] == True]['won'].count()/df_trade['won'].count()
