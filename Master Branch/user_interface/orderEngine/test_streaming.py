import requests
import json


def run(instruction):
    print(list)
    headers = {'Content-Type': 'application/json',
           "Authorization": "Bearer 97d52be243d7514c12fd9ba55071a0f1-20491f440dc7968368bc83afcc2357a1"}
    # Streaming prices
    baseurl = 'https://stream-fxpractice.oanda.com/v3/accounts/101-001-17903846-001/pricing/stream'
    payload = { 'instruments' : instruction}
    r = requests.get(baseurl, params=payload, headers=headers, stream=True)
    print(r.headers)
    print('\n')

    for line in r.iter_lines():
        if line:
            print(json.loads(line.decode("utf-8")))

# for list in ['EUR_USD', 'EUR_AUD']:
run(['EUR_USD', 'EUR_AUD'])



