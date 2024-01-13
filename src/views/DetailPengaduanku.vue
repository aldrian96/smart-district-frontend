<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header pb-0">
        <div
          class="kotak d-flex justify-content-between align-items-center mb-0"
        >
          <h6 class="mb-0">{{ data?.title }}</h6>
          <div class="d-flex align-items-center">
            <span
              class="badge badge"
              :class="{
                'bg-gradient-info': data?.priority == 'low',
                'bg-gradient-warning': data?.priority == 'medium',
                'bg-gradient-danger': data?.priority == 'high',
              }"
              >{{ data?.priority }}</span
            >
            <span
              class="badge ms-2"
              :class="{
                'bg-gradient-success': data?.status == 'Selesai',
                'bg-gradient-warning': data?.status == 'Sedang di Proses',
              }"
              >{{ data?.status }}</span
            >
          </div>
        </div>
      </div>
      <div class="card-body pt-3">
        <div class="kotak mb-3">
          <p class="text-uppercase">
            <i class="fa fa-user" aria-hidden="true"></i>
            User Information
          </p>
          <hr />
          <div class="row">
            <div class="col-2 d-flex justify-content-between">
              <b>Pelapor</b> :
            </div>
            <div class="col">{{ data?.author.name }}</div>
          </div>
          <div class="row">
            <div class="col-2 d-flex justify-content-between">
              <b>Email</b> :
            </div>
            <div class="col">{{ data?.author.email }}</div>
          </div>
        </div>
        <div class="kotak mb-3">
          <p class="text-uppercase">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            Deskripsi
          </p>
          <hr />
          <div class="row">
            <div class="col-2 d-flex justify-content-between">
              <b>Tanggal</b> :
            </div>
            <div class="col">
              {{
                new Date(data?.author.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </div>
          </div>
          <div class="row">
            <div class="col-2 d-flex justify-content-between">
              <b>Kategori</b> :
            </div>
            <div class="col">{{ data?.category }}</div>
          </div>
          <div class="row">
            <div class="col-2 d-flex justify-content-between">
              <b>Keterangan</b> :
            </div>
            <div class="col">{{ data?.body }}</div>
          </div>
          <div class="row">
            <div class="col-2 d-flex justify-content-between">
              <b>Saran Solusi</b> :
            </div>
            <div class="col">
              {{ data?.solution }}
            </div>
          </div>
        </div>
        <div class="kotak mb-3">
          <p class="text-uppercase">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
            Gambar Masalah
          </p>
          <hr />
          <img src="@/assets/img/coblong.jpg" class="img-fluid" alt="" />
        </div>
        <div class="kotak">
          <p class="text-uppercase">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            Lokasi
          </p>
          <hr />
          <table class="mb-3">
            <tr>
              <td><strong>Lattitude</strong></td>
              <td>:</td>
              <td>{{ data?.lattitude }}</td>
            </tr>
            <tr>
              <td><strong>Longitude</strong></td>
              <td>:</td>
              <td>{{ data?.longitude }}</td>
            </tr>
          </table>

          <LeafletMap v-model="location" />
        </div>
      </div>
      <div class="card-footer text-end">
        <button
          @click="router.push({ name: 'Pengaduanku' })"
          class="btn btn-secondary"
        >
          <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
          Back to List
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import LeafletMap from "@/components/LeafletMap.vue";
import { GetReportsDetailById } from "../api.js";

const router = useRouter();
const route = useRoute();
const data = ref(null);

onMounted(async () => {
  if (!route.params?.id) {
    // kondisi ketika parameter id tidak ada / null / undefined
    console.log("Data kosong");
  }

  data.value = await GetReportsDetailById(route.params.id);
});
</script>

<style scoped>
.kotak {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
/* margin-bottom: 20px; */
</style>
