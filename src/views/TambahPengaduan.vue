<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Tambah Pengaduan</p>
              <argon-button color="success" size="sm" class="ms-auto"
                >Tambah</argon-button
              >
            </div>
          </div>
          <div class="card-body">
            <!-- <p class="text-uppercase text-sm">Informasi Pengaduan</p> -->
            <div class="row mb-7">
              <div class="col-12">
                <label for="example-text-input" class="form-control-label"
                  >JUDUL PENGADUAN</label
                >
                <argon-input type="text" v-model="model.judul" />
              </div>

              <div class="col-12">
                <label for="example-text-input" class="form-control-label"
                  >DESKRIPSI</label
                >
                <QuillEditor
                  theme="snow"
                  toolbar="essential"
                  v-model:content="model.deskripsi"
                  contentType="html"
                />
              </div>
            </div>
            {{ model.deskripsi }}

            <!-- <hr class="horizontal dark" /> -->
            <div class="row">
              <div class="col-md-12">
                <label for="example-text-input" class="form-control-label"
                  >SARAN DAN SOLUSI</label
                >
                <argon-input type="text" />
              </div>
              <div class="col-md-4">
                <label for="example-text-input" class="form-control-label"
                  >City</label
                >
                <argon-input type="text" />
              </div>
              <div class="col-md-4">
                <label for="example-text-input" class="form-control-label"
                  >Country</label
                >
                <argon-input type="text" />
              </div>
              <div class="col-md-4">
                <label for="example-text-input" class="form-control-label"
                  >Postal code</label
                >
                <argon-input type="text" />
              </div>
            </div>
            <hr class="horizontal dark" />
            <p class="text-uppercase text-sm">About me</p>
            <div class="row">
              <div class="col-md-12">
                <label for="example-text-input" class="form-control-label"
                  >About me</label
                >
                <argon-input type="text" />
              </div>
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
import ArgonButton from "@/components/ArgonButton.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive, ref } from "vue";

const model = reactive({
  judul: null,
  deskripsi: null,
  prioritas: null,
  tanggal: null,
  status: null,
});
</script>

<style></style>
