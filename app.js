var map = new L.Map('map');

var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
  cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
  cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});

map.setView(new L.LatLng(0.0, 20.0), 3).addLayer(cloudmade);

var geojsonLayer = new L.GeoJSON();
map.addLayer(geojsonLayer);

// var source = 'data/AfTerFibre_21nov2011.json';
var url = 'http://thedatahub.org/api/data/f5d81da5-2e55-4302-8ed2-58401d2c139e/_search'
var data = {
  size: 112
};
var jqxhr = $.ajax({
  url: url,
  data: data,
  dataType: 'jsonp'
});
geojsonLayer.on("featureparse", function (e) {
  if (e.properties && e.properties.popupContent){
      e.layer.bindPopup(e.properties.popupContent);
  }
});
jqxhr.done(function(data) {
  $.each(data.hits.hits, function(idx, item) {
    var geojson = item._source.Location;
    var content = $('<div />');
    content.append($('<h3 />').text(item._source.Route + ' [' + item._source.Country + ']'));
    content.append($('<p />').text(item._source.Description));
    geojson.properties = {
      popupContent: content.html()
    };
    geojsonLayer.addGeoJSON(geojson);
  });
});

