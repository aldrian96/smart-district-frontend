<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header pb-0">
        <div class="d-flex align-items-center">
          <p class="mb-0">DETAIL PENGADUAN</p>
        </div>
        <hr />
      </div>
      <div class="card-body">
        <!-- Add your details here -->
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Judul Pengaduan :</li>
          <li class="list-group-item">Kategori :</li>
          <li class="list-group-item">Prioritas :</li>
          <li class="list-group-item">Tanggal :</li>
          <li class="list-group-item">Status Pengaduan :</li>
          <li class="list-group-item">Longitude :</li>
          <li class="list-group-item">Lattitude :</li>
          <li class="list-group-item">Deskripsi</li>
          <li class="list-group-item">Saran dan Solusi</li>
        </ul>
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

const router = useRouter();
</script>
