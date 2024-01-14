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

          <LeafletMap
            v-model="location"
            :longitude="data?.longitude"
            :lattitude="data?.lattitude"
            mode="view"
          />
        </div>
      </div>
      <div class="card-footer text-end">
        <button
          @click="router.push({ name: 'LandingPage' })"
          class="btn btn-secondary"
        >
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
                <div class="col-12">
                  <div class="panel">
                    <div class="panel-body">
                      <textarea
                        class="form-control"
                        rows="2"
                        placeholder="Bagaimana pendapat anda?"
                      ></textarea>
                      <div class="mar-top clearfix">
                        <button
                          class="btn btn-sm btn-primary pull-right my-2"
                          type="submit"
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
                        v-bind:author_name="row.author.name"
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
                ></textarea>
                <div class="mar-top clearfix">
                  <button
                    class="btn btn-sm btn-primary pull-right my-2"
                    type="submit"
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
              class="rounded-circle shadow-1-strong"
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

const router = useRouter();
const route = useRoute();
const data = ref(null);

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

/* ————————————————————–
  Tree core styles
*/
ul {
  list-style-type: none;
}

ul input {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

ul input ~ ul {
  display: none;
}

ul input:checked ~ ul {
  display: block;
}

/* ————————————————————–
  Tree rows
*/
ul li {
  line-height: 1.2;
  position: relative;
  padding: 0 0 1em 1em;
}

ul ul li {
  padding: 1 0 0 1em;
}

ul > li:last-child {
  padding-bottom: 0;
}

/* ————————————————————–
  Tree labels
*/
.tree_label {
  position: relative;
  display: inline-block;
}

label.tree_label {
  cursor: pointer;
}

label.tree_label:hover {
  color: #666;
}

/* ————————————————————–
  Tree expanded icon
*/
label.tree_label:before {
  background: #000;
  color: #fff;
  position: relative;
  z-index: 1;
  float: left;
  margin: 0 1em 0 -2em;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  content: "+";
  text-align: center;
  line-height: 0.9em;
}

:checked ~ label.tree_label:before {
  content: "–";
}

/* ————————————————————–
  Tree branches
*/
ul li:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -0.5em;
  display: block;
  width: 0;
  border-left: 1px solid #777;
  content: "";
}

.tree_label:after {
  position: absolute;
  top: 0;
  left: -1.5em;
  display: block;
  height: 0.5em;
  width: 1em;
  border-bottom: 1px solid #777;
  border-left: 1px solid #777;
  border-radius: 0 0 0 0.3em;
  content: "";
}

label.tree_label:after {
  border-bottom: 0;
}

:checked ~ label.tree_label:after {
  border-radius: 0 0.3em 0 0;
  border-top: 1px solid #777;
  border-right: 1px solid #777;
  border-bottom: 0;
  border-left: 0;
  bottom: 0;
  top: 0.5em;
  height: auto;
}

ul li:last-child:before {
  height: 1em;
  bottom: auto;
}

ul > li:last-child:before {
  display: none;
}

.tree_custom {
  display: block;
  background: #eee;
  padding: 1em;
  border-radius: 0.3em;
}

a:hover {
  text-decoration: underline;
}

/* margin-bottom: 20px; */
</style>
