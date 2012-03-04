Geodata showing African terrestrial fibre optic cable projects. Data is available as CSV or JSON (+ GeoJSON) via the DataStore API.

### Data

Primary data file is the CSV resource: <http://thedatahub.org/dataset/afterfibre/resource/f5d81da5-2e55-4302-8ed2-58401d2c139e>

However, this data needed to be cleaned up and converted to geojson for storing in the DataHub DataStore and visualization. Details of this below.

#### Cleaning

Use data package manager (dpm) to clone the DataHub dataset.

<pre>
# say yes to downloading of data files
dpm clone http://thedatahub.org/dataset/afterfibre .
</pre>

You will now have an afterfibre directory containing the dataset.

    cd afterfibre

Grab scripts from the code repository

    git clone https://github.com/rgrp/dp-afterfibre .

Now run cleanup - note you will need to install geojson (pip install geojson)

    python convert.py

Now you have json version of data in data/AfTerFibre_21nov2011.json. We will upload this to the DataHub DataStore for the original CSV.

Note: you will need the DataStore client from https://gist.github.com/1950581

    ckan-datastore.py upload http://thedatahub.org/api/data/f5d81da5-2e55-4302-8ed2-58401d2c139e data/AfTerFibre_21nov2011.json 

Let's check the result:

    http://thedatahub.org/api/data/f5d81da5-2e55-4302-8ed2-58401d2c139e/_search?size=5&pretty=true

Now the data's ready for easy visualization in javascript! (Check ou the visualization resource).

