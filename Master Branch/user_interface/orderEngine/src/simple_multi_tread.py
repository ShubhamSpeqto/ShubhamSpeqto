import time
import requests
import logging
from concurrent import futures

logging.getLogger().setLevel(logging.INFO)

def fetch_url(im_url):
    try:
        resp = requests.get(im_url)
    except Exception as e:
        logging.info("could not fetch {}".format(im_url))
    else:
        return resp.content
        

def fetch_all(url_list):
    with futures.ThreadPoolExecutor() as executor:
        responses = executor.map(fetch_url, url_list)
    return responses
    

if __name__=='__main__':

    url = "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"

    for ntimes in [1, 10, 100, 500, 1000]:
        start_time = time.time()
        responses = fetch_all([url] * ntimes)
        logging.info('Fetch %s urls takes %s seconds', ntimes, time.time() - start_time)
