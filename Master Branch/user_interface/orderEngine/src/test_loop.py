import logging
import time
import asyncio
from itertools import count
from aiohttp import ClientSession, ClientResponseError

logging.basicConfig(
    filename="./test_thread.log",
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s : %(message)s',
)

logger = logging.getLogger(__name__)
# logging.getLogger().setLevel(logging.INFO)

async def fetch(session, url, no):
    try:
        logger.info("Fetch Executed of %s at %s seconds", str(no), str(time.time()))
        # for i in count(0):
        for i in range(no):
            logger.info("Fetch Executed %s - %s", str(i), str(no))
        # async with session.get(url, timeout=15) as response:
        #     resp = await response.read()
    except ClientResponseError as e:
        logger.warning(e.code)
    except asyncio.TimeoutError:
        logger.warning("Timeout")
    except Exception as e:
        logger.warning(e)
    else:
        return
    return


async def fetch_async(loop, r):
    # please use url by your choice
    url = "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
    tasks = []
    # try to use one client session
    async with ClientSession() as session:
        for i in range(r):
            logger.info("Fetch_async Executed of %s at %s seconds", str(i), str(time.time()))
            task = asyncio.ensure_future(fetch(session, url, i))
            tasks.append(task)
        # await response outside the for loop
        responses = await asyncio.gather(*tasks)
    return responses


if __name__ == '__main__':
    for ntimes in [10]:
        start_time = time.time()
        loop = asyncio.get_event_loop()
        future = asyncio.ensure_future(fetch_async(loop, ntimes))
        loop.run_until_complete(future)
        responses = future.result()
        logger.info('Fetch %s urls takes %s seconds', ntimes, str(time.time() - start_time))
        logger.info('{} urls were read successfully'.format(len(responses)))
