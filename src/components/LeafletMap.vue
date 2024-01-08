<!-- LeafletMap.vue -->
<template>
  <div id="leaflet-map"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = ref(null);

const initMap = () => {
  map.value = L.map("leaflet-map").setView(
    [-6.885186278844472, 107.61364044816199],
    20
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);
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
