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
          <span class="row px-3 fw-semibold fs-4">
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
  moment.lang("id");
  // return moment(date).format("dddd, DD MMMM YYYY [pukul] HH:mm");
  return moment(date).fromNow();
};
// import moment from 'moment';

// moment.locale('id')

const router = useRouter();

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const dataTable = ref([]);

// TIME CONVERSION
const MonthName = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
//   const day = date.getDate();
//   const month = MonthName[date.getMonth()];
//   const year = date.getFullYear();
//   const hours = date.getHours();
//   let minutes = date.getMinutes();

//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   if (prefomattedDate) {
//     return `${prefomattedDate} jam ${hours}:${minutes}`;
//   }

//   if (hideYear) {
//     return `${day}. ${month} jam ${hours}:${minutes}`;
//   }

//   return `${day}. ${month} ${year}. jam ${hours}:${minutes}`;
// }

// function timeAgo(dateParam) {
//   if (!dateParam) {
//     return null;
//   }

//   const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
//   const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
//   const today = new Date();
//   const yesterday = new Date(today - DAY_IN_MS);
//   const seconds = Math.round((today - date) / 1000);
//   const minutes = Math.round(seconds / 60);
//   const isToday = today.toDateString() === date.toDateString();
//   const isYesterday = yesterday.toDateString() === date.toDateString();
//   const isThisYear = today.getFullYear() === date.getFullYear();

//   if (seconds < 5) {
//     return "Sekarang";
//   } else if (seconds < 60) {
//     return `${seconds} detik yang lalu`;
//   } else if (seconds < 90) {
//     return "sekitar semenit yang lalu";
//   } else if (minutes < 60) {
//     return `${minutes} detik yang lalu`;
//   } else if (isToday) {
//     return getFormattedDate(date, "Hari Ini");
//   } else if (isYesterday) {
//     return getFormattedDate(date, "Kemarin");
//   } else if (isThisYear) {
//     return getFormattedDate(date, false, true);
//   }

//   return getFormattedDate(date);
// }

onMounted(async () => {
  dataTable.value = await GetAllReport();
});
</script>

<style scoped>
.pengaduan {
  transition: 0.2s;
}

.pengaduan:hover {
  /* font-size: 1.2rem; */
  background-color: #fafafa;
  cursor: pointer;
  /* text-decoration: underline; */
}
</style>
