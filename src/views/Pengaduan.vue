<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6>Tabel Pengaduan</h6>
          </div>
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

                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Prioritas
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Tanggal
                    </th>
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Status Pengaduan
                    </th>
                    <th class="text-center text-secondary opacity-7"></th>
                    <th class="text-center text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in dataTable" :key="row">
                    <td>
                      <div class="d-flex p-2">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ row.title }}</h6>
                          <p class="text-xs text-secondary mb-0">
                            {{ truncateText(row.body, 50) }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span
                        class="badge badge-sm"
                        :class="{
                          'bg-gradient-info': row.priority == 'low',
                          'bg-gradient-warning': row.priority == 'medium',
                          'bg-gradient-danger': row.priority == 'high',
                        }"
                        >{{ row.priority }}</span
                      >
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        {{
                          new Date(row.created_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        }}
                      </p>
                    </td>

                    <td class="align-middle text-center text-sm">
                      <span
                        class="badge badge-sm"
                        :class="{
                          'bg-gradient-success': row.status == 'Selesai',
                          'bg-gradient-warning':
                            row.status == 'Sedang di Proses',
                        }"
                        >{{ row.status }}</span
                      >
                    </td>
                    <!-- <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >23/04/18</span
                >
              </td> -->
                    <td class="align-middle">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs text-center"
                        data-toggle="tooltip"
                        data-original-title="Detail user"
                        >Edit</a
                      >
                    </td>
                    <td class="align-middle">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs text-center"
                        data-toggle="tooltip"
                        data-original-title="Detail user"
                        >Detail</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <!-- <projects-table /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { onMounted, ref } from "vue";
import axios from "axios";
import { GetReports } from "../api.js";
// Ngambil data di .env
// const { VITE_CLIENT_KEY } = import.meta.env;

const dataTable = ref([]);

// Triple Dot
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

onMounted(async () => {
  // Login("superadmin@smartdistrict.com", "123456");
  dataTable.value = await GetReports();
  console.log(dataTable.value);
});
</script>
