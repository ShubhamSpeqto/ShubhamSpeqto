# -*- coding: utf-8 -*-
import re
import time
import argparse
from datetime import datetime
import calendar
import json
import logging
from oandapyV20 import API
from oandapyV20.exceptions import V20Error
import oandapyV20.endpoints.instruments as instruments
import oandapyV20.endpoints.pricing as pricing
import oandapyV20.endpoints.orders as orders
import oandapyV20.endpoints.positions as positions
from oandapyV20.contrib.requests import (
    MarketOrderRequest,
    TakeProfitDetails,
    StopLossDetails
)

from oandapyV20.definitions.instruments import CandlestickGranularity
from exampleauth import exampleAuth

import time
import requests
import urllib.request as req
import asyncio
from aiohttp import ClientSession, ClientResponseError

logging.basicConfig(
    filename="./bot.log",
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s : %(message)s',
)

logger = logging.getLogger(__name__)

NEUTRAL = 0
SHORT = 1
LONG = 2

def mapstate(s):
    logger.info("mapstate executed")
    logger.info("s value")
    logger.info(s)
    states = {
       NEUTRAL: "NEUTRAL",
       SHORT: "SHORT",
       LONG: "LONG",
    }
    # breakpoint()
    return states[s]


class Event(object):

    def __init__(self):
        self.handlers = set()

    def handle(self, handler):
        logger.info("%s: adding handler: %s",
                    self.__class__.__name__, handler.__name__)
        self.handlers.add(handler)
        return self

    def unhandle(self, handler):
        try:
            self.handlers.remove(handler)
        except:
            raise ValueError("Handler is not handling this event, "
                             "so cannot unhandle it.")
        return self

    def fire(self, instrument, *args, **kargs):
        # breakpoint()
        for handler in self.handlers:
            handler(instrument, *args, **kargs)

    def getHandlerCount(self):
        return len(self.handlers)

    __iadd__ = handle
    __isub__ = unhandle
    __call__ = fire
    __len__ = getHandlerCount

class Indicator(object):
    """indicater baseclass."""
    def __init__(self, pt, instrument):
        logger.info("Indicator __init__ executed")
        logger.info("pt value")
        logger.info(pt)
        self._pt = pt
        for single_instrument in instrument.split("/"):
            self.values = [None] * len(self._pt._price_table[single_instrument]['_dt'])
        # self.values = [None] * len(self._pt._dt)

    def calculate(self):
        raise Exception("override this method")

    def __len__(self):
        return len(self._pt)

    def __getitem__(self, i):
        def rr(_i):
            if _i >= len(self._pt):  # do not go beyond idx
                logger.info("IndexError: list assignment index out of range")
                logger.info("self._pt value")
                logger.info(self._pt)
                logger.info("_i value")
                logger.info(_i)
                raise IndexError("list assignment index out of range")
            if _i < 0:
                logger.info("_i < 0 executed")
                logger.info("_i value")
                logger.info(_i)
                _i = self._pt.idx + _i

            return self.values[_i]

        if isinstance(i, int):
            logger.info("isinstance if executed")
            logger.info("i value")
            logger.info(i)
            return rr(i)
        elif isinstance(i, slice):
            logger.info("isinstance else executed")
            logger.info("i value")
            logger.info(i)
            return [rr(j) for j in range(*i.indices(len(self)))]
        else:
            raise TypeError("Invalid argument")


class MAx(Indicator):
    """Moving average crossover."""

    def __init__(self, pt, smaPeriod, lmaPeriod, instrument):
        logger.info("MAx __init__ executed")
        logger.info("pt value")
        logger.info(pt)
        logger.info("smaPeriod value")
        logger.info(smaPeriod)
        logger.info("lmaPeriod value")
        logger.info(lmaPeriod)
        super(MAx, self).__init__(pt, instrument)
        self.smaPeriod = smaPeriod
        self.lmaPeriod = lmaPeriod
        self._events = Event()
        # breakpoint()
        self.state = {}
        for single_instrument in instrument.split("/"):
            self.state[single_instrument] = NEUTRAL
        # breakpoint()
        print("end initilize Max Function")

    # def calculate(self, idx):
    def calculate(self, instrument, idx):
        logger.info("calculate executed")
        logger.info("idx value")
        # breakpoint()
        logger.info(idx)
        if idx <= self.lmaPeriod:   # not enough values to calculate MAx
            logger.info("idx value before set None")
            logger.info(self.values[idx-1])
            self.values[idx-1] = None
            # breakpoint()
            return

        # perform inefficient MA calculations to get the MAx value
        logger.info("# perform inefficient MA calculations to get the MAx value")
        logger.info("idx value")
        logger.info(idx)
        logger.info("self.smaPeriod value")
        logger.info(self.smaPeriod)
        print(self._pt._price_table[instrument]['_c'][idx-self.smaPeriod:idx])
        print("printed 177")
        SMA = sum(self._pt._price_table[instrument]['_c'][idx-self.smaPeriod:idx]) / self.smaPeriod
        print("SMA ",str(SMA))
        # logger.info("SMA value")
        # logger.info(SMA)
        LMA = sum(self._pt._price_table[instrument]['_c'][idx-self.lmaPeriod:idx]) / self.lmaPeriod
        print("LMA ",str(LMA))
        # logger.info("LMA value")
        # logger.info(LMA)
        self.values[idx-1] = SMA - LMA
        # breakpoint()
        print("values [idx-1]",str(self.values[idx-1]))
        # logger.info("self.values value")
        # logger.info(self.values[idx-1])
        self.state[instrument] = LONG if self.values[idx-1] > 0 else SHORT
        print("state",str(self.state))
        # print("MAx: processed %s : state: %s", self._pt[-1][0], mapstate(self.state))
        # print("MAx: processed state: %s", mapstate(self.state))
        # logger.info("MAx: processed %s : state: %s",
        #             self._pt[-1][0], mapstate(self.state))


class PriceTable(object):

    def __init__(self, instrument, granularity):
        logger.info("PriceTable __init__ executed")
        self.instrument = instrument
        self.granularity = granularity
        logger.info("self.instrument value")
        logger.info(self.instrument)
        logger.info("self.granularity value")
        logger.info(self.granularity)
        self._price_table = {}
        for single_instrument in instrument.split("/"):
            self._price_table.update({single_instrument: {}})
            self._price_table.update({single_instrument: {'_dt': [None] * 1000, '_c': [None] * 1000, '_v': [None] * 1000, '_events': {}, 'idx': 0}})
        # print(self._price_table)
        # self._dt = [None] * 1000  # allocate space for datetime
        # price_table.update({instrument: {}})
        # self._c = [None] * 1000   # allocate space for close values
        # price_table.update({instrument: {}})
        # self._v = [None] * 1000   # allocate space for volume values
        # price_table.update({instrument: {}})
        # self._events = {}         # registered events
        # price_table.update({instrument: {}})
        # self.idx = 0
        # breakpoint()

    def fireEvent(self, name, instrument, *args, **kwargs):
        logger.info("fireEvent call")
        # breakpoint()
        # if name in self._events.instrument:
        if name in self._price_table[instrument]['_events']:
            logger.info("fireEvent name")
            logger.info(name)
            # f = self._events.instrument[name]
            f = self._price_table[instrument]['_events'][name]
            # breakpoint()
            f(instrument, *args, **kwargs)

    def setHandler(self, name, f, instrument):
        logger.info("setHandler executed")
        logger.info("name value")
        logger.info(name)
        logger.info("f value")
        logger.info(f)
        logger.info("instrument value")
        logger.info(instrument)
        for single_instrument in instrument.split("/"):
            if name not in self._price_table[single_instrument]['_events']:
                self._price_table[single_instrument]['_events'][name] = Event()
            self._price_table[single_instrument]['_events'][name] += f
        # breakpoint()

    def addItem(self, dt, c, v, instrument):
        logger.info("addItem executed")
        logger.info("dt value")
        logger.info(dt)
        logger.info("c value")
        logger.info(c)
        logger.info("v value")
        logger.info(v)
        logger.info("instrument value")
        logger.info(instrument)
        logger.info("self.idx value")
        # logger.info(self.idx)
        # breakpoint()
        self._price_table[instrument]['_dt'][self._price_table[instrument]['idx']] = dt
        # self._dt.instrument[self.idx] = dt
        self._price_table[instrument]['_c'][self._price_table[instrument]['idx']] = c
        # self._c.instrument[self.idx] = c
        self._price_table[instrument]['_v'][self._price_table[instrument]['idx']] = v
        # self._v.instrument[self.idx] = v
        self._price_table[instrument]['idx'] += 1
        # self.idx += 1
        # breakpoint()
        self.fireEvent('onAddItem', instrument, self._price_table[instrument]['idx'])

    def __len__(self):
        logger.info("__len__ executed")
        logger.info("self.idx value")
        logger.info(self.idx)
        return self.idx

    def __getitem__(self, i):
        logger.info("PriceTable __getitem__ Executed")
        breakpoint()
        def rr(_i):
            if _i >= self.idx:  # do not go beyond idx in the reserved items
                raise IndexError("list assignment index out of range")
            if _i < 0:
                _i = self.idx + _i   # the actual end of the array
            return (self._dt[_i], self._c[_i], self._v[_i])

        if isinstance(i, int):
            return rr(i)
        elif isinstance(i, slice):
            return [rr(j) for j in range(*i.indices(len(self)))]
        else:
            raise TypeError("Invalid argument")


class PRecordFactory(object):
    """generate price records from streaming prices."""
    def __init__(self, granularity, instrument_list):
        print("PRecordFactory function executed")
        # breakpoint()
        self._PRecordFactorytable = {}
        for single_instrument in instrument_list:
            # breakpoint()
            self._PRecordFactorytable.update({single_instrument: {
                '_last': None,
                '_granularity': granularity,
                'interval': self.granularity_to_time(granularity),
                'data' : {"c": None, "v": 0}
            }})
        # breakpoint()
        print("PRecordFactory init done")
        # self._last = None
        # self._granularity = granularity
        # self.interval = self.granularity_to_time(granularity)
        # self.data = {"c": None, "v": 0}
        # breakpoint()

    def parseTick(self, t, single_instrument):
        print("parseTick function executed")
        # t = json.loads(t)
        # single_instrument = t["instrument"]
        # breakpoint()
        rec = None
        if not self._PRecordFactorytable[single_instrument]['_last']:
            if t["type"] != "PRICE":
                return rec
            epoch = self.epochTS(t["time"])
            self._PRecordFactorytable[single_instrument]['_last'] = epoch - (epoch % self._PRecordFactorytable[single_instrument]['interval'])
            # breakpoint()
            print("end of if parseTick")
            self._PRecordFactorytable[single_instrument]["_last"] = epoch - (epoch % self._PRecordFactorytable[single_instrument]["interval"])

        # if self.epochTS(t["time"]) > self._last + self.interval:
        if self.epochTS(t["time"]) > self._PRecordFactorytable[single_instrument]['_last'] + self._PRecordFactorytable[single_instrument]['interval']:
            # save this record as comnpleted
            rec = (self.secs2time(self._PRecordFactorytable[single_instrument]['_last']), self._PRecordFactorytable[single_instrument]['data']['c'], self._PRecordFactorytable[single_instrument]['data']['v'])
            # rec = (self.secs2time(self._last), self.data['c'], self.data['v'])
            # init new one
            self._PRecordFactorytable[single_instrument]['_last'] += self._PRecordFactorytable[single_instrument]['interval']
            # self._last += self.interval
            self._PRecordFactorytable[single_instrument]['data']["v"] = 0
            # self.data["v"] = 0

        if t["type"] == "PRICE":
            self._PRecordFactorytable[single_instrument]['data']["c"] = (float(t['closeoutBid']) +
                                                                         float(t['closeoutAsk'])) / 2.0
            # self.data["c"] = (float(t['closeoutBid']) +
            #                   float(t['closeoutAsk'])) / 2.0
            self._PRecordFactorytable[single_instrument]['data']["v"] += 1
            # self.data["v"] += 1
        # breakpoint()
        print(self._PRecordFactorytable)
        return rec

    def granularity_to_time(self, gran):
        mfact = {'S': 1, 'M': 60, 'H': 3600, 'D': 86400}
        try:
            f, n = re.match("(?P<f>[SMHD])(?:(?P<n>\d+)|)",
                            gran).groups()
        except:
            raise ValueError("Can't handle granularity: {}".format(gran))
        else:
            n = int(n) if n else 1
            return mfact[f] * n

    def epochTS(self, t):
        d = datetime.strptime(t.split(".")[0], '%Y-%m-%dT%H:%M:%S')
        return int(calendar.timegm(d.timetuple()))

    def secs2time(self, e):
        w = time.gmtime(e)
        return datetime(*list(w)[0:6]).strftime("%Y-%m-%dT%H:%M:%S.000000Z")

class BotTrader(object):
    def __init__(self, instrument, granularity, units, clargs):
        logger.info("BotTrader Executed")
        self.accountID, token = exampleAuth()
        self.client = API(access_token=token)
        self.units = units
        self.clargs = clargs
        # for single_instrument in instrument.split("/"):
        #     print(single_instrument)
        #     breakpoint()
        self.pt = PriceTable(instrument, granularity)
        logger.info("self.pt value initilized")
        # breakpoint()
        # logger.info(json.dumps(self.pt.__dict__))
        mavgX = MAx(self.pt, clargs.shortMA, clargs.longMA, instrument)
        # logger.info("mavgX value")
        # logger.info(json.dumps(mavgX.__dict__))
        self.pt.setHandler("onAddItem", mavgX.calculate, instrument)
        self.indicators = [mavgX]
        # breakpoint()
        self.state = {}
        for single_instrument in instrument.split("/"):
            self.state[single_instrument] = NEUTRAL   # overall state based on calculated indicators
            # breakpoint()
            # fetch initial historical data
            params = {"granularity": granularity,
                      "count": self.clargs.longMA}
            r = instruments.InstrumentsCandles(instrument=single_instrument,
                                               params=params)
            # breakpoint()
            rv = self.client.request(r)

            # and calculate indicators
            for crecord in rv['candles']:
                if crecord['complete'] is True:
                    self.pt.addItem(crecord['time'],
                                    float(crecord['mid']['c']),
                                    int(crecord['volume']),
                                    single_instrument)
        logger.info("After first slot self.pt._price_table value")
        logger.info(self.pt._price_table)
        # breakpoint()
        # print("At End")
        self._botstate(instrument.split("/"))

    def _botstate(self, instrument):
        # overall state, in this case the state of the only indicator ...
        logger.info("_botstate call")
        logger.info("_botstate prev.state")
        logger.info(self.state)
        logger.info("_botstate self.state")
        logger.info(self.indicators[0].state)
        logger.info("_botstate self.units")
        logger.info(self.units)

        for single_instrument in instrument:
            print('in _botstate')
            # breakpoint()
            prev = self.state[single_instrument]
            self.state[single_instrument] = self.indicators[0].state[single_instrument]
            units = self.units
            if self.state[single_instrument] != prev and self.state[single_instrument] in [SHORT, LONG]:
                # logger.info("state change: from %s to %s", mapstate(prev),
                #             mapstate(self.state))
                units *= (1 if self.state[single_instrument] == LONG else -1)
                # breakpoint()
                print('in if condition _botstate')
                self.close(single_instrument)
                self.order(units, single_instrument) #This code place order on platform
            # breakpoint()
            print('end of botstate')

    def order(self, units, instrument):

        mop = {"instrument": instrument,
               "units": units}

        def frmt(v):
            # breakpoint()
            # format a number over 6 digits: 12004.1, 1.05455
            l = len(str(v).split(".")[0])
            return "{{:{}.{}f}}".format(l, 6-l).format(v)

        direction = 1 if units > 0 else -1
        # breakpoint()
        print('direction for order')
        print(direction)
        if self.clargs.takeProfit:   # takeProfit specified? add it
            # tpPrice = self.pt._c[self.pt.idx-1] * \
            #           (1.0 + (self.clargs.takeProfit/100.0) * direction)
            tpPrice = self.pt._price_table[instrument]['_c'][self.pt._price_table[instrument]['idx']-1] * \
                      (1.0 + (self.clargs.takeProfit/100.0) * direction)
            print("takeProfitOnFill", frmt(tpPrice), "for instrument", instrument)
            mop.update({"takeProfitOnFill":
                        TakeProfitDetails(price=frmt(tpPrice)).data})

        if self.clargs.stopLoss:     # stopLosss specified? add it
            slPrice = self.pt._price_table[instrument]['_c'][self.pt._price_table[instrument]['idx']-1] * \
                      (1.0 + (self.clargs.stopLoss/100.0) * -direction)
            print("stopLossOnFill", frmt(slPrice), "for instrument", instrument)
            mop.update({"stopLossOnFill":
                        StopLossDetails(price=frmt(slPrice)).data})

        data = MarketOrderRequest(**mop).data
        print("data for order place")
        print(data)
        r = orders.OrderCreate(accountID=self.accountID, data=data)
        try:
            response = self.client.request(r)
            print("in try")
        except V20Error as e:
            logger.error("V20Error: %s", e)
        else:
            print("in else")
            logger.info("Response: %d %s", r.status_code,
                        json.dumps(response, indent=2))

    def close(self, instrument):
        logger.info("Close existing positions ... for ")
        logger.info(instrument)
        print("Close existing positions ... for ", instrument)
        r = positions.PositionDetails(accountID=self.accountID,
                                      instrument=instrument)
        # breakpoint()

        try:
            openPos = self.client.request(r)
            print(openPos)

        except V20Error as e:
            # breakpoint()
            logger.error("V20Error: %s", e)

        else:
            toClose = {}
            for P in ["long", "short"]:
                if openPos["position"][P]["units"] != "0":
                    toClose.update({"{}Units".format(P): "ALL"})

            logger.info("prepare to close: {}".format(json.dumps(toClose)))
            print("prepare to close: {}".format(json.dumps(toClose)))
            r = positions.PositionClose(accountID=self.accountID,
                                        instrument=instrument,
                                        data=toClose)
            rv = None
            try:
                if toClose:
                    rv = self.client.request(r)
                    # breakpoint()
                    logger.info("close: response: %s",
                                json.dumps(rv, indent=2))

            except V20Error as e:
                # breakpoint()
                logger.error("V20Error: %s", e)

    def run(self):
        print("Run Function Executed")
        # breakpoint()
        instrumentList = self.pt._price_table.keys()
        query_parameter = ",".join(instrumentList)
        url = 'https://stream-fxpractice.oanda.com/v3/accounts/101-001-17903846-001/pricing/stream?instruments='+query_parameter
        head = {'Content-type':"application/json",
                'Accept-Datetime-Format':"RFC3339",
                'Authorization':"Bearer 50539a31374324f3adda0199a0ab86b4-ac7b3e5cf9c53b716a90edb71d4c7bb8"}
        # breakpoint()

        r = requests.get(url, headers=head, stream=True)
        print(r)
        cf = PRecordFactory(self.pt.granularity, instrumentList)
        for tick in r.iter_lines():

            if tick:
                decoded_line = tick.decode('utf-8')
                print(json.loads(decoded_line))
                tick = json.loads(tick)
                print(tick)
                if tick["type"] != 'HEARTBEAT':
                    single_instrument = tick["instrument"]
                    rec = cf.parseTick(tick, single_instrument)
                    # breakpoint()
                    print(rec)
                    if rec:
                        self.pt.addItem(*rec, single_instrument)
                    # breakpoint()
                    self._botstate(instrumentList)
                # if rec:
                #     breakpoint()
                #     print("in if rec")
                #     self.pt.addItem(*rec)
        # cf = PRecordFactory(self.pt.granularity, instrumentList)
        # for single_instrument in instrumentList:
        #     breakpoint()
        #     print(single_instrument)
        #     r = pricing.PricingStream(accountID=self.accountID,
        #                               params={"instruments": instrumentList})
        #     breakpoint()
        #     for tick in self.client.request(r):
        #         rec = cf.parseTick(tick, single_instrument)
        #         print('single_instrument in tick')
        #         print(single_instrument)
        #         breakpoint()
        #         if rec:
        #             breakpoint()
        #             print("in if rec")
                    # self.pt.addItem(*rec)

                # breakpoint()
                # self._botstate()

# ------------------------
if __name__ == "__main__":
    granularities = CandlestickGranularity().definitions.keys()
    print(granularities)
    #
    # create the top-level parser
    parser = argparse.ArgumentParser(prog='bot')
    parser.add_argument('--longMA', default=20, type=int,
                        help='period of the long movingaverage')
    parser.add_argument('--shortMA', default=10, type=int,
                        help='period of the short movingaverage')
    parser.add_argument('--stopLoss', default=0.01, type=float,
                        help='stop loss value as a percentage of entryvalue')
    parser.add_argument('--takeProfit', default=0.01, type=float,
                        help='take profit value as a percentage of entryvalue')
    parser.add_argument('--instrument', type=str, help='instrument', required=True)
    parser.add_argument('--granularity', choices=granularities, required=True)
    parser.add_argument('--units', type=int, required=True)
    # clargs = parser.parse_args()
    clargs=parser.parse_args(['--instrument','EUR_USD','--granularity','S5','--units','10','--stopLoss','0.02','--takeProfit','0.02'])
    print(clargs)
    # breakpoint()
    bot = BotTrader(instrument=clargs.instrument,
                    granularity=clargs.granularity,
                    units=clargs.units, clargs=clargs)
    bot.run()
