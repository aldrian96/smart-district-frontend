<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Ubah Pengaduan</p>
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
                  v-model="model.judul"
                  placeholder="Ubah Judul Pengaduan"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">DESKRIPSI</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Jelaskan Tentang Pengaduan Kamu"
                  v-model="model.deskripsi"
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">SARAN DAN SOLUSI</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Jika Kamu Mempunyai Saran dan Solusi Bisa Tulis Disini Ya"
                  v-model="model.saranSolusi"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">BUKTI PENGADUAN</label>
                <input class="form-control" type="file" id="formFile" />
              </div>
              <div class="mb-3">
                <label for="formCategory">PILIH KATEGORI</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Kategori Pengaduan</option>
                  <option value="1">Location</option>
                  <option value="2">Normal</option>
                </select>
              </div>
            </div>
            <!-- <div class="row mb-3">
              <img src="@/assets/img/coblong.jpg" class="img-fluid" alt="" />
            </div> -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label"
                  >Latitude
                </label>
                <input class="form-control" type="text" disabled />
              </div>
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label"
                  >Longitude</label
                >
                <input class="form-control" type="text" disabled />
              </div>
            </div>
            <div class="row">
              <LeafletMap v-model="location" />
            </div>
            <hr class="horizontal dark" />

            <div class="d-flex align-items-center">
              <button
                to="/dashboard/pengaduanku"
                class="btn btn-secondary btn-sm me-2"
                @click="router.push({ name: 'Pengaduanku' })"
              >
                Kembali
              </button>
              <button class="btn btn-success btn-sm">Tambah</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useRouter } from "vue-router";
import ArgonInput from "@/components/ArgonInput.vue";
// import ArgonButton from "@/components/ArgonButton.vue";
// import { QuillEditor } from "@vueup/vue-quill";
import LeafletMap from "@/components/LeafletMap.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive, ref } from "vue";

const router = useRouter();

const model = reactive({
  judul: null,
  deskripsi: null,
  saranSolusi: null,
});
</script>

<style>
/* .custom-img-size {
    width: 200px;
    height: auto;
  } */
</style>
