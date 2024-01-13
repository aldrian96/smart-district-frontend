<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Tambah Pengaduan</p>
              <hr />
            </div>
          </div>
          <div class="card-body">
            <!-- <p class="text-uppercase text-sm">Informasi Pengaduan</p> -->
            <div class="row mb-3">
              <div class="col-12">
                <label for="example-text-input" class="form-control-label"
                  >JUDUL PENGADUAN</label
                >
                <input
                  class="form-control mb-3"
                  type="text"
                  v-model="model.title"
                  placeholder="Masukan Judul Pengaduan"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">DESKRIPSI</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Jelaskan Tentang Pengaduan Kamu"
                  v-model="model.body"
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">SARAN DAN SOLUSI</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Jika Kamu Mempunyai Saran dan Solusi Bisa Tulis Disini Ya"
                  v-model="model.solution"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">BUKTI PENGADUAN</label>
                <input class="form-control" type="file" id="formFile" />
              </div>
              <div class="mb-3">
                <label for="formCategory">PILIH KATEGORI</label>
                <select
                  v-model="model.category"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Kategori Pengaduan</option>
                  <option value="1">Location</option>
                  <option value="2">Normal</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label"
                  >Latitude
                </label>
                <input
                  v-model="model.lattitude"
                  class="form-control"
                  type="text"
                  disabled
                />
              </div>
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label"
                  >Longitude</label
                >
                <input
                  v-model="model.longitude"
                  class="form-control"
                  type="text"
                  disabled
                />
              </div>
            </div>
            <div class="row mb-3 p-3">
              <LeafletMap
                v-model:lattitude="model.lattitude"
                v-model:longitude="model.longitude"
                mode="input"
              />
            </div>

            <hr class="horizontal dark" />

            <div class="d-flex align-items-center justify-content-end">
              <button
                to="/dashboard/pengaduanku"
                class="btn btn-secondary me-2"
                @click="router.push({ name: 'Pengaduanku' })"
              >
                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                Kembali
              </button>
              <button @click="tambahPengaduan" class="btn btn-success">
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import ArgonInput from "@/components/ArgonInput.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import { useRouter } from "vue-router";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive, ref } from "vue";
import { createReports } from "../api.js";

const router = useRouter();

const model = reactive({
  title: null,
  body: null,
  solution: null,
  category: null,
  attachment: null,
  lattitude: null,
  longitude: null,
});

const tambahPengaduan = async () => {
  // Validasi
  if (!model.title || !model.body) {
    // || !model.category
    // Handle kesalahan validasi
    console.error("Harap isi semua kolom yang diperlukan");
    return;
  }

  // Persiapan data untuk dikirim ke API
  const dataPengaduan = {
    title: model.title,
    body: model.body,
    solution: model.solution,
    category: model.category,
    longitude: model.longitude,
    lattitude: model.lattitude,
  };

  try {
    // Panggil fungsi createReports untuk menambahkan pengaduan
    const response = await createReports(dataPengaduan);
    console.log(response);
    // Handle respon dari backend
    if (response.success === "OK") {
      console.log("Pengaduan berhasil ditambahkan");
      // Redirect ke halaman Pengaduanku setelah berhasil menambahkan
      router.push({ name: "Pengaduanku" });
    } else {
      console.error("Gagal menambahkan pengaduan", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<style></style>
