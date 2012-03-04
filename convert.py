'''Clean up original CSV, converting KML LineStrings to GeoJSON and producing
CSV and JSON output.
'''
import csv
import re
import geojson
import json

path = 'data/AfTerFibre_21nov2011.csv'
outpath = 'data/AfTerFibre_21nov2011.geojson.csv'
outpathjson = 'data/AfTerFibre_21nov2011.json'
linestring_regex = 'LINESTRING ?\(([^)]*)\)'

reader = csv.reader(open(path))
writer = csv.writer(open(outpath, 'w'))

# headers
headers = reader.next()
# correct typo (should be Location but says Botswana)!
headers[5] = 'Location'
writer.writerow(headers)

outjson = []
for count,row in enumerate(reader):
    outrow = list(row)
    # if count > 2: break
    linestring = row[5]
    match = re.match(linestring_regex, linestring)
    if not match:
        print('Failed to match')
        print(linestring)
        continue
    coords = match.group(1).split(',')
    # we do not need altitude
    coords = [ map(float, coord.split(' ')[:2]) for coord in coords ]
    p = geojson.LineString(coords)
    outrow[5] = geojson.dumps(p)
    writer.writerow(outrow)
    outrow[5] = json.loads(geojson.dumps(p))
    outjson.append(dict(zip(headers, outrow)))

json.dump(outjson, open(outpathjson, 'w'), indent=2)

