import time
import requests

while True:
    r = requests.get("http://localhost:8080/live")
    if r:
        with open("data-in/{0}.json".format(int(time.time())), "w") as f:
            f.write(r.text)
    time.sleep(5)