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
  var x = lat,
    y = lng;
  for (var ii = 0; ii < poly.getLatLngs().length; ii++) {
    var polyPoints = poly.getLatLngs()[ii];
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
      var xi = polyPoints[i].lat,
        yi = polyPoints[i].lng;
      var xj = polyPoints[j].lat,
        yj = polyPoints[j].lng;

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
  }

  return inside;
};

const initMap = () => {
  const coblongCoordinates = [-6.884646484984671, 107.61358014375573];
  const coblongArea = [
    [-6.882704, 107.601034],
    [-6.90023, 107.60227],
    [-6.900248, 107.604258],
    [-6.895569, 107.604018],
    [-6.895134, 107.606167],
    [-6.895668, 107.6067],
    [-6.89559, 107.606879],
    [-6.89573, 107.607292],
    [-6.895826, 107.607615],
    [-6.896048, 107.607995],
    [-6.89687, 107.609092],
    [-6.896868, 107.609176],
    [-6.897839, 107.609325],
    [-6.89803, 107.609304],
    [-6.89818, 107.609382],
    [-6.898252, 107.609628],
    [-6.89828, 107.609773],
    [-6.898649, 107.610671],
    [-6.89908, 107.613246],
    [-6.899084, 107.614868],
    [-6.899079, 107.61565],
    [-6.899181, 107.616245],
    [-6.899387, 107.616349],
    [-6.899211, 107.616603],
    [-6.89929, 107.617248],
    [-6.899335, 107.618014],
    [-6.899302, 107.618419],
    [-6.899288, 107.619276],
    [-6.899265, 107.62007],
    [-6.899221, 107.62161],
    [-6.899203, 107.62344],
    [-6.899209, 107.623793],
    [-6.898428, 107.623839],
    [-6.897919, 107.62409],
    [-6.897882, 107.624192],
    [-6.897473, 107.624494],
    [-6.896545, 107.625091],
    [-6.89595, 107.625212],
    [-6.895566, 107.625413],
    [-6.895755, 107.626211],
    [-6.895535, 107.626789],
    [-6.895613, 107.627352],
    [-6.895688, 107.627594],
    [-6.895492, 107.627754],
    [-6.894216, 107.628065],
    [-6.893491, 107.627687],
    [-6.893123, 107.627598],
    [-6.892265, 107.627598],
    [-6.892244, 107.628634],
    [-6.89197, 107.62903],
    [-6.891942, 107.629741],
    [-6.892066, 107.630488],
    [-6.891826, 107.630724],
    [-6.890334, 107.630302],
    [-6.889533, 107.629783],
    [-6.888804, 107.627846],
    [-6.88844, 107.626886],
    [-6.887936, 107.626433],
    [-6.88705, 107.626547],
    [-6.886942, 107.626205],
    [-6.886868, 107.625625],
    [-6.88666, 107.625213],
    [-6.885589, 107.625048],
    [-6.884631, 107.624348],
    [-6.88377, 107.623587],
    [-6.882765, 107.622923],
    [-6.882515, 107.622179],
    [-6.881391, 107.6216],
    [-6.880741, 107.621467],
    [-6.87968, 107.621726],
    [-6.878856, 107.621713],
    [-6.878555, 107.622041],
    [-6.877532, 107.622324],
    [-6.876012, 107.621932],
    [-6.87485, 107.622033],
    [-6.874448, 107.621737],
    [-6.8743, 107.621749],
    [-6.873249, 107.621256],
    [-6.873134, 107.621127],
    [-6.872674, 107.62127],
    [-6.87201, 107.621417],
    [-6.871753, 107.621737],
    [-6.870457, 107.62195],
    [-6.869259, 107.622397],
    [-6.868623, 107.622434],
    [-6.868203, 107.622621],
    [-6.867548, 107.623355],
    [-6.866623, 107.623933],
    [-6.866086, 107.62456],
    [-6.866442, 107.625263],
    [-6.865992, 107.625775],
    [-6.864889, 107.62625],
    [-6.86388, 107.626402],
    [-6.863333, 107.625772],
    [-6.863228, 107.625161],
    [-6.863997, 107.624037],
    [-6.864369, 107.623892],
    [-6.864491, 107.623472],
    [-6.864145, 107.623319],
    [-6.86371, 107.623272],
    [-6.86371, 107.622999],
    [-6.864531, 107.622393],
    [-6.864463, 107.621754],
    [-6.864227, 107.621362],
    [-6.864279, 107.621293],
    [-6.864181, 107.620842],
    [-6.863883, 107.620471],
    [-6.863883, 107.620213],
    [-6.864158, 107.619647],
    [-6.863967, 107.619235],
    [-6.863981, 107.618864],
    [-6.86525, 107.618517],
    [-6.866111, 107.61681],
    [-6.866358, 107.615702],
    [-6.86743, 107.614442],
    [-6.867622, 107.614391],
    [-6.867755, 107.614089],
    [-6.867634, 107.613565],
    [-6.868605, 107.612234],
    [-6.869821, 107.611839],
    [-6.870979, 107.6125],
    [-6.871203, 107.612506],
    [-6.871377, 107.612285],
    [-6.871223, 107.611695],
    [-6.87139, 107.611478],
    [-6.872214, 107.611847],
    [-6.872609, 107.611756],
    [-6.87288, 107.611217],
    [-6.873251, 107.610847],
    [-6.873623, 107.610778],
    [-6.873974, 107.611035],
    [-6.874177, 107.611529],
    [-6.874388, 107.611585],
    [-6.87494, 107.611279],
    [-6.874541, 107.610389],
    [-6.874552, 107.60995],
    [-6.875501, 107.609754],
    [-6.876445, 107.609408],
    [-6.877153, 107.608426],
    [-6.877622, 107.608644],
    [-6.878615, 107.608351],
    [-6.878951, 107.608102],
    [-6.879217, 107.607678],
    [-6.879912, 107.607936],
    [-6.880258, 107.607842],
    [-6.880727, 107.606777],
    [-6.881782, 107.606696],
    [-6.882743, 107.606608],
    [-6.88405, 107.606758],
    [-6.884237, 107.606957],
    [-6.884375, 107.6076],
    [-6.884554, 107.607635],
    [-6.884631, 107.606704],
    [-6.883318, 107.605245],
    [-6.884988, 107.604557],
    [-6.883278, 107.603211],
    [-6.882702, 107.601028],
  ];

  map.value = L.map("leaflet-map", {
    zoomControl: true,
    zoom: 1,
    zoomAnimation: false,
    fadeAnimation: true,
    markerZoomAnimation: true,
  }).setView(coblongCoordinates, 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  //marker map

  // icon normal state
  const iconSettings = {
    mapIconUrl:
      '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
    mapIconColor: "red",
    mapIconColorInnerCircle: "red",
    pinInnerCircleRadius: 30,
  };

  const divIcon = L.divIcon({
    className: "leaflet-data-marker",
    html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
    iconAnchor: [12, 32],
    iconSize: [25, 30],
    popupAnchor: [0, -28],
  });

  // menambahkan area coblong ke map
  let polygon = L.polygon(coblongArea);
  map.value.fitBounds(polygon.getBounds());

  polygon.addTo(map.value);
  polygon.setStyle({ fillColor: "orange" });

  // menambahkan event klik ke dalam map
  let theMarker = {};
  let choosenCoord = {};

  map.value.on("click", function (e) {
    // e.stopPropagation();

    let coord = e.latlng;
    let lat = coord.lat;
    let lng = coord.lng;
    if (isMarkerInsidePolygon(lat, lng, polygon)) {
      if (theMarker != undefined) {
        map.value.removeLayer(theMarker);
      }
      choosenCoord = [lat, lng];
      theMarker = L.marker(e.latlng, { icon: divIcon }).addTo(map.value);
      console.log("Koordinat yang di klik adalah : " + choosenCoord);
    }
  });

  if (choosenCoord == undefined) {
    console.log("Harap klik map untuk menambahkan koordinat terlebih dahulu.");
  }
};

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
