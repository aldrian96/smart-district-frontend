<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- <div class="card-header pb-0">
            <h6>Tabel Pengaduan</h6>
          </div> -->
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Judul Pengaduan
                    </th>
                    <!-- <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Balasan
                    </th>
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Balasan Terakhir
                    </th> -->
                    <!-- <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Status Pengaduan
                    </th> -->
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in dataTable" :key="row">
                    <td>
                      <div class="d-flex p-2 ps-3">
                        <div
                          class="d-flex flex-column justify-content-center w-100"
                        >
                          <h6 class="mb-0 w-100 d-block">
                            <!-- <a :href="`#`" @click="navigateToDetailPage(row.id)" class="judul w-100 d-block">{{
                              row.title + " " }}</a> -->
                            <router-link
                              :to="`/Thread/${row.id}`"
                              class="judul w-100 d-block"
                              >{{ row.title + " " }}
                              <span
                                class="badge badge-sm"
                                :class="{
                                  'bg-gradient-info': row.priority == 'low',
                                  'bg-gradient-warning':
                                    row.priority == 'medium',
                                  'bg-gradient-danger': row.priority == 'high',
                                  'bg-gradient-secondary':
                                    row.priority == 'unknown',
                                }"
                                >{{
                                  row.priority == "unknown"
                                    ? "Menunggu Konfirmasi"
                                    : row.priority
                                }}</span
                              >
                              {{ " " }}
                              <span
                                class="badge badge-sm"
                                :class="{
                                  'bg-gradient-success':
                                    row.status == 'Selesai',
                                  'bg-gradient-warning':
                                    row.status == 'Sedang di Proses',
                                  'bg-gradient-secondary':
                                    row.status == 'Belum di Proses',
                                }"
                                >{{ row.status }}</span
                              >
                            </router-link>
                          </h6>
                          <p
                            class="text-xs mb-0 text-secondary font-weight-bolder mt-1"
                          >
                            Dibuat hari {{ formatDate(row.created_at) }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <!-- <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ row.reply }}
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ row.lastReply }}
                      </p>
                    </td> -->
                    <td>
                      <a :href="`/Thread/${row.id}`">
                        <p class="text-secondary">
                          {{ row.comment_counts }}
                          <i class="fa fa-regular fa-comment"></i>
                        </p>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
  return moment(date).format("dddd, DD MMMM YYYY [pukul] HH:mm");
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

<style>
.judul {
  transition: 0.1s;
}

.judul:hover {
  font-size: 1.2rem;
  color: blue;
  font-weight: bolder;
  /* text-decoration: underline; */
}
</style>
