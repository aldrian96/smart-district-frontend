<!-- LeafletMap.vue -->
<template>
  <div id="leaflet-map"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = ref(null);

const isMarkerInsidePolygon = (lat, lng, poly) => {
  var inside = false;
  var x = lat, y = lng;
  for (var ii = 0; ii < poly.getLatLngs().length; ii++) {
    var polyPoints = poly.getLatLngs()[ii];
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
      var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
      var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

      var intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
  }

  return inside;
};

const initMap = () => {
  const coblongCoordinates = [-6.884646484984671, 107.61358014375573];
  const coblongArea = [
    [-6.883698482022497, 107.60508515716094],
    [-6.880183475047726, 107.60853984199206],
    [-6.879075709880987, 107.61150100041874],
    [-6.878935997444623, 107.61409052459129],
    [-6.8782430693882315, 107.6169278501209],
    [-6.88136123767984, 107.6189306681418],
    [-6.883967227353902, 107.61984103996949],
    [-6.885262685104325, 107.6206755474782],
    [-6.889374986851575, 107.61891549527802],
    [-6.8933406913845925, 107.61776153313001],
    [-6.894684906132727, 107.61325270363955],
    [-6.890497334066072, 107.60798771990278],
    [-6.89001273636389, 107.60782195927197],
    [-6.8881887327736555, 107.60792402972618],
    [-6.884160699997812, 107.60514260984944],
    [-6.883698482022497, 107.60508515716094]
  ]
  map.value = L.map("leaflet-map", { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true }).setView(
    coblongCoordinates,
    15
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  //marker map

  // icon normal state
  const iconSettings = {
    mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
    mapIconColor: 'red',
    mapIconColorInnerCircle: 'red',
    pinInnerCircleRadius: 30
  };

  const divIcon = L.divIcon({
    className: "leaflet-data-marker",
    html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
    iconAnchor: [12, 32],
    iconSize: [25, 30],
    popupAnchor: [0, -28]
  })

  // menambahkan area coblong ke map
  let polygon = L.polygon(coblongArea);
  map.value.fitBounds(polygon.getBounds());

  polygon.addTo(map.value);
  polygon.setStyle({ fillColor: 'orange' });

  // menambahkan event klik ke dalam map
  let theMarker = {};
  let choosenCoord = {};

  map.value.on('click', function (e) {
    // e.stopPropagation();


    let coord = e.latlng;
    let lat = coord.lat;
    let lng = coord.lng;
    if (isMarkerInsidePolygon(lat, lng, polygon)) {

      if (theMarker != undefined) {
        map.value.removeLayer(theMarker);
      };
      choosenCoord = [lat, lng];
      theMarker = L.marker(e.latlng, { icon: divIcon }).addTo(map.value);
      console.log("Koordinat yang di klik adalah : " + choosenCoord)
    }

  });

  if (choosenCoord == undefined) {
    console.log("Harap klik map untuk menambahkan koordinat terlebih dahulu.")
  }

}


onMounted(() => {
  initMap();

  // Tambahkan watch untuk mengamati perubahan pada properti location
  watch(location, (newLocation) => {
    // Implementasikan logika untuk menampilkan marker pada peta sesuai dengan lokasi baru
    console.log("Location updated:", newLocation);
  });
});
</script>

<style scoped>
#leaflet-map {
  height: 400px;
}
</style>
