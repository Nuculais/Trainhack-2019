import json
from os import listdir
from os.path import isfile, join

#IMPORT_PATH = "test-data"
IMPORT_PATH = "data-in"
RESULT_FNAME = "live-data.json"

timestamps = [
    int(f.split(".")[0]) for f in listdir(IMPORT_PATH)
    if isfile(join(IMPORT_PATH, f))
]

timestamps = sorted(timestamps)

base_ts = timestamps[0]

vendors = {"BUS": 0, "TRAM": 1, "BOAT": 2, "REG": 3, "VAS": 4, "TAXI": 5}

result = {}

for ts in timestamps:
    f_name = "{0}/{1}.json".format(IMPORT_PATH, ts)
    with open(f_name, "r") as f:
        data = json.loads(f.read())['livemap']

    for v in data['vehicles']:
        gid = v['gid']
        lat = int(v['x']) / 1000000
        lon = int(v['y']) / 1000000
        cl = v['prodclass']
        if gid in result.keys():
            new_ts = ts - base_ts
            if new_ts not in result[gid]['timestamps']:
                result[gid]['path'].append([lat, lon])
                result[gid]['timestamps'].append(new_ts)
        else:
            result[gid] = {
                'path': [[lat, lon]],
                'timestamps': [ts - base_ts],
                'vendor': vendors[cl]
            }

#print(list(result.values()))
with open(RESULT_FNAME, 'w') as f:
    f.write(json.dumps(list(result.values())))