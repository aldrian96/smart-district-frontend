<template>
  <div class="bg-white mx-0 mt-0 mb-4 p-0">
    <div class="pt-4 container">
      <div
        v-for="(row, i) in dataTable"
        @click="router.push({ name: 'Thread', params: { id: row.id } })"
        :key="row"
        class="row d-flex justify-content-between align-items-center p-3 border-bottom border-1 pengaduan"
        data-aos="fade-left"
        data-aos-once="true"
        :data-aos-delay="i * 50"
      >
        <div class="row">
          <span class="row px-3 fw-semibold fs-4 forum-font">
            {{ row.title }}
          </span>
          <div class="d-flex flex-row align-items-center px-0 py-1 info">
            <span
              class="badge badge-sm"
              :class="{
                'bg-gradient-info': row.priority == 'low',
                'bg-gradient-warning': row.priority == 'medium',
                'bg-gradient-danger': row.priority == 'high',
                'bg-gradient-secondary': row.priority == 'unknown',
              }"
              >{{
                row.priority == "unknown" ? "Menunggu Konfirmasi" : row.priority
              }}</span
            >
            <span
              class="badge badge-sm mx-2"
              :class="{
                'bg-gradient-success': row.status == 'Selesai',
                'bg-gradient-warning': row.status == 'Sedang di Proses',
                'bg-gradient-secondary': row.status == 'Belum di Proses',
              }"
              >{{ row.status }}</span
            >
            |
            <span class="mx-2 text-primary">
              <i class="fa fa-regular fa-user me-2"></i>
              <span class="border-bottom border-1 border-primary">{{
                row.author.name
              }}</span>
            </span>

            <span class="me-2">
              {{ formatDate(row.created_at) }}
            </span>
            &#x2022;
            <span class="ms-2 text-danger">
              <i class="fa fa-regular fa-comment me-1"></i>
              <span class="border-bottom border-1 border-danger">
                {{ row.comment_counts }} comments
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */

import axios from "axios";
import { onMounted, ref } from "vue";
import { GetAllReport } from "../api.js";
import { useRouter } from "vue-router";
import moment from "moment";

const formatDate = (date) => {
  moment.locale("id");
  return moment(date).fromNow();
};
const router = useRouter();

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const dataTable = ref([]);

onMounted(async () => {
  dataTable.value = await GetAllReport();
});
</script>

<style scoped>
@font-face {
  font-family: "Poppins";
  src: url("~@/assets/fonts/Dosis-Medium.ttf");
}
.pengaduan {
  transition: 0.2s;
  font-family: "Roboto", sans-serif; /* Ganti dengan nama font Mona Sans yang benar */
}

.pengaduan:hover {
  /* font-size: 1.2rem; */
  background-color: #fafafa;
  cursor: pointer;
  /* text-decoration: underline; */
}

.forum-font {
  font-family: Poppins, sans-serif;
}
</style>
