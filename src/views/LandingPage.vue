<template>
  <NavbarHome title="ADUIN" :navs="navs" />
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <!-- <h6>Tabel Pengaduan</h6> -->
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Judul Pengaduan
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Prioritas
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Tanggal Pelaporan
                    </th>
                    <!-- <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Balasan
                    </th>
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Balasan Terakhir
                    </th> -->
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Status Pengaduan
                    </th>
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in dataTable" :key="row">
                    <td>
                      <div class="d-flex p-2">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">
                            <!-- <a :href="`/Thread/${row.id}`">{{ row.judul }}</a> -->
                            <a :href="`#`" @click="navigateToDetailPage">{{ row.title }}</a>
                          </h6>
                          <p class="text-xs text-secondary mb-0">
                            {{ truncateText(row.body, 50) }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm" :class="{
                        'bg-gradient-info': row.priority == 'low',
                        'bg-gradient-warning': row.priority == 'medium',
                        'bg-gradient-danger': row.priority == 'high',
                      }">{{ row.priority }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        <!-- {{ formatDate(row.created_at) }} -->
                        {{
                          new Date(row.created_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        }}
                      </p>
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
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm" :class="{
                            'bg-gradient-success': row.status == 'Selesai',
                            'bg-gradient-warning':
                              row.status == 'Sedang di Proses',
                          }">{{ row.status }}</span>
                    </td>
                    <td class="align-middle">
                      <div class="d-flex justify-content-center">
                        <div class="me-2">
                          <button @click="
                            router.push({
                              name: 'DetailPengaduan',
                              params: { id: row.id },
                            })
                            " class="btn btn-info mb-0 text-xs" data-toggle="tooltip"
                            data-original-title="Detail user">
                            <i class="fa fa-inbox" aria-hidden="true"></i>
                            Detail
                          </button>
                        </div>
                      </div>
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

import NavbarHome from "../components/NavbarHome.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { GetAllReport } from "../api.js";
import { useRouter } from "vue-router";
// import moment from 'moment';

const router = useRouter();


const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const dataTable = ref([]);

onMounted(async () => {
  dataTable.value = await GetAllReport();
  console.log(dataTable.value);
});

</script>
