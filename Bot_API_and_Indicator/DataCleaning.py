# data cleanning part
import pandas as pd

df=pd.read_csv("/home/shubham/Downloads/pirate_arbbot-main/Bot API/11Jan_EVE_Data.csv")
# print(df["Complete"])
# df.drop(['Volume'],axis=1,inplace=True)

df.drop_duplicates(inplace=True)
# print(len(df))
# print(df["Complete"][2])
# for i in range(len(df)):
#     print(df["Complete"][i])
    # if (df["Complete"][i]==True):
#             if(df["Complete"][i+1]==False):
#                 df.drop(labels=i+2,axis=0,inplace=True)
#                 print(i+1)


# print(df)
# # print(type(df.index))
# c=0
# for index in df.index:
#     if df["Complete"][index]==True:
#         df.drop(labels=index,axis=0,inplace=True)

# print(df)
df.to_csv("/home/shubham/Downloads/pirate_arbbot-main/Bot API/Cleaned11Jan_EVE_Data.csv")

print(len(df))

print(df)
