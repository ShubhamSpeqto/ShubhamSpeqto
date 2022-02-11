import pandas as pd
# from pydantic import FilePath

if __name__=="__main__":
    File_path='/home/shubham/Downloads/pirate_arbbot-main/HalfTrend1_Oanda_Live.csv'
   
    df=pd.read_csv(File_path)
    
    c=0
    Buy_Price=[]
    Stop_Loss=[]
    Take_Profit=[]
    for i in range(len(df)):
        
        if i<=3:
            Buy_Price.append("NAN")
            Stop_Loss.append("NAN")
            Take_Profit.append("NAN")
            continue
        if df["Buysignal"][i]==0 and df["Buysignal"][i-1]==1:
            if df["200_ema"][i]<df["Low"][i] and df["200_ema"][i-1]<df["Low"][i-1] and df["200_ema"][i-2]<df["Low"][i-2]:
                # Trigger_Price=df["Halftrend"][i]
                Buy_Price.append(df["Open"][i+1])
                Stop_Loss.append(df["Atr_low"][i])
                TP=(Buy_Price[-1]-Stop_Loss[-1])*2+Buy_Price[-1]
                Take_Profit.append(TP)
                print(Buy_Price)
            else:
                Buy_Price.append("NAN")
                Stop_Loss.append("NAN")
                Take_Profit.append("NAN")
        else:
            Buy_Price.append("NAN")
            Stop_Loss.append("NAN")
            Take_Profit.append("NAN")
    print(len(Buy_Price))
    df["Buy_Price"]=Buy_Price
    df["Stop_Loss"]=Stop_Loss
    df["Take_Profit"]=Take_Profit

    # df.to_csv(File_path)
                # print(Buy_Price,Stop_Loss,Take_Profit)
                
                # print(df["Time"][i])
                # c=c+1
                # print(c)
