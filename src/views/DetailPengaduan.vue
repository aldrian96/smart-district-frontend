<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header pb-0">
        <div class="buku d-flex justify-content-between align-items-center">
          <h6 class="mb-0">JUDUL PENGADUAN</h6>
          <div class="d-flex align-items-center">
            <span class="badge badge-warning">Medium</span>
            <span class="ms-2 badge badge-success">Selesai</span>
          </div>
        </div>
        <div class="buku mt-2 mb-0">
          <table>
            <p class="text-uppercase text-sm">User Information</p>
            <hr />
            <tr>
              <td><strong>Author</strong></td>
              <td>:</td>
              <td>Pelapor 2</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>:</td>
              <td>user2@smartdistrict.com</td>
            </tr>
            <tr>
              <td><strong>Tanggal Pengaduan</strong></td>
              <td>:</td>
              <td>28 Januari 2024</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="card-body">
        <div class="buku">
          <p class="text-uppercase text-sm">Deskripsi</p>
          <hr />
          <table>
            <tr>
              <td><strong>Kategori</strong></td>
              <td>:</td>
              <td>Location</td>
            </tr>
            <tr>
              <td><strong>Longitude</strong></td>
              <td>:</td>
              <td>-9382471123</td>
            </tr>
            <tr>
              <td><strong>Latitude</strong></td>
              <td>:</td>
              <td>67431412312</td>
            </tr>
            <tr>
              <td><strong>Penjelasan Masalah</strong></td>
              <td>:</td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos, ex.
              </td>
            </tr>
            <tr>
              <td><strong>Saran dan Solusi</strong></td>
              <td>:</td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
                reiciendis officia.
              </td>
            </tr>
          </table>
        </div>
        <div class="buku">
          <p class="text-uppercase text-sm">Gambar Masalah</p>
          <hr />
          <img src="@/assets/img/coblong.jpg" class="img-fluid" alt="" />
        </div>
        <div class="buku">
          <p class="text-uppercase text-sm">Lokasi</p>
          <hr />
          <LeafletMap v-model="location" />
        </div>
      </div>
      <div class="card-footer text-end">
        <button
          @click="router.push({ name: 'Pengaduan' })"
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
import { useRouter } from "vue-router";
import LeafletMap from "@/components/LeafletMap.vue";

const router = useRouter();
</script>
<style scoped>
.buku {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
