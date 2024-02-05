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
                'bg-gradient-secondary': data?.priority == 'unknown',
              }"
              >{{
                data?.priority == "unknown"
                  ? "Menunggu Konfirmasi"
                  : data?.priority
              }}</span
            >
            <span
              class="badge ms-2"
              :class="{
                'bg-gradient-success': data?.status == 'Selesai',
                'bg-gradient-warning': data?.status == 'Sedang di Proses',
                'bg-gradient-secondary': data?.status == 'Belum di Proses',
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
          <!-- <div class="row">
            <div class="col-2 d-flex justify-content-between">
              <b>Kategori</b> :
            </div>
            <div class="col">{{ data?.category }}</div>
          </div> -->
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
          <center>
            <img
              :src="
                'https://api-smartdistrict.luthordev.com/api/image?attachment_path=' +
                data?.attachment_path
              "
              height="400px"
              alt=""
            />
          </center>
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

          <LeafletMap
            v-model="location"
            :longitude="data?.longitude"
            :lattitude="data?.lattitude"
            mode="view"
          />
        </div>
      </div>
      <div class="card-footer text-end">
        <!-- @click="router.go(-1)" -->
        <button @click="router.back()" class="btn btn-secondary">
          <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
          Back to List
        </button>
      </div>
    </div>
    <!-- kolom komentar -->
    <!-- <section class="gradient-custom"> -->
    <div v-if="data?.comments.length != 0">
      <div class="container-fluid mt-3 p-3">
        <h2>Komentar</h2>
        <hr />
        <div class="row d-flex justify-content-center">
          <div class="card">
            <div class="card-body p-4">
              <div class="row">
                <div class="col-12 my-3">
                  <div class="row">
                    <div class="col-6">
                      <textarea
                        v-model="model.body"
                        class="form-control"
                        rows="2"
                        placeholder="Bagaimana pendapat anda?"
                      ></textarea>
                    </div>
                    <div class="col-6">
                      <div class="mar-top clearfix">
                        <button
                          class="btn btn-sm btn-secondary pull-right my-2"
                          @click="addComment"
                        >
                          <i class="fa fa-pencil fa-fw"></i> Tambahkan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <!-- kolom chat -->
                <div v-for="row in data?.comments" :key="row">
                  <ul>
                    <li>
                      <Comment
                        v-bind:id="row.id"
                        v-bind:report_id="data?.id"
                        v-bind:author_name="row.author.name"
                        v-bind:profile_picture_path="
                          row.author.profile_picture_path
                        "
                        v-bind:author_role="row.author.role"
                        v-bind:created_date="row.created_at"
                        v-bind:body="row.body"
                        v-bind:child="row.all_replies"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="container mt-5">
        <h2>Komentar</h2>
        <hr />
        <div class="row">
          <div class="col-12">
            <div class="panel">
              <div class="panel-body">
                <textarea
                  class="form-control"
                  rows="2"
                  placeholder="Bagaimana pendapat anda?"
                  v-model="model.body"
                ></textarea>
                <div class="mar-top clearfix">
                  <button
                    class="btn btn-sm btn-primary pull-right my-2"
                    type="submit"
                    @click="addComment"
                  >
                    <i class="fa fa-pencil fa-fw"></i> Tambahkan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <h1>Belum ada yang berkomentar di laporan ini :(</h1>
          </div>
          <div class="col">
            <img
              class="rounded-circle"
              src="https://cdn.dribbble.com/users/1003944/screenshots/10032634/media/a3165ce3eed01d0913652902582fe39f.gif"
              height="500"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- </section> -->
  </div>
</template>

<script setup>
/* eslint-disable */
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import LeafletMap from "@/components/LeafletMap.vue";
import { GetDetailsHeadless } from "../api.js";
import Comment from "@/components/Comment.vue";
import { reactive } from "vue";
import { createComment } from "../api.js";

const router = useRouter();
const route = useRoute();
const data = ref(null);

const model = reactive({
  body: null,
});
const addComment = async () => {
  console.log(model.body);
  console.log(data.value.id);
  const dataComment = {
    body: model.body,
    report_id: data.value.id,
  };
  try {
    // Panggil fungsi createReports untuk menambahkan pengaduan
    const response = await createComment(dataComment);
    console.log(response);
    // Handle respon dari backend
    if (response.success === "OK") {
      console.log("Komentar berhasil ditambahkan");
      router.go({ name: "Thread", params: { id: data.value.id } });
      // Redirect ke halaman Pengaduanku setelah berhasil menambahkan
    } else {
      console.error("Gagal menambahkan komentar", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
onMounted(async () => {
  if (!route.params?.id) {
    // kondisi ketika parameter id tidak ada / null / undefined
    console.log("Data kosong");
  }

  data.value = await GetDetailsHeadless(route.params.id);
});
</script>

<style scoped>
.kotak {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
ul {
  list-style-type: none;
}
</style>
