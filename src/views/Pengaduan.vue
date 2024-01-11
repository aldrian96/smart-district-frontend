<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6>Detail Pengaduan</h6>
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
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Action
                    </th>
                    <!-- <th class="text-center text-secondary opacity-7"></th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in dataTable" :key="row">
                    <td>
                      <div class="d-flex p-2 ps-3">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ row.judul }}</h6>
                          <p class="text-xs text-secondary mb-0">
                            {{ row.deskripsi }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span
                        class="badge badge-sm"
                        :class="{
                          'bg-gradient-info': row.prioritas == 'Low',
                          'bg-gradient-warning': row.prioritas == 'Medium',
                          'bg-gradient-danger': row.prioritas == 'High',
                        }"
                        >{{ row.prioritas }}</span
                      >
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ row.tanggal }}
                      </p>
                    </td>

                    <td class="align-middle text-center text-sm">
                      <span
                        class="badge badge-sm"
                        :class="{
                          'bg-gradient-success': row.status == 'Selesai',
                          'bg-gradient-warning': row.status == 'Diproses',
                          'bg-gradient-secondary':
                            row.status == 'Belum Diproses',
                        }"
                        >{{ row.status }}</span
                      >
                    </td>
                    <td class="align-middle">
<<<<<<< HEAD
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs text-center"
                        data-toggle="tooltip"
                        data-original-title="Detail user"
                        >Detail</a
                      >
=======
                      <div class="d-flex justify-content-center">
                        <div class="me-2">
                          <button
                            @click="
                              router.push({
                                name: 'DetailPengaduan',
                                params: { id: row.id },
                              })
                            "
                            class="btn btn-warning mb-0 text-xs"
                            data-toggle="tooltip"
                            data-original-title="Detail user"
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                            Edit
                          </button>
                        </div>
                        <div>
                          <button
                            @click="
                              router.push({
                                name: 'DetailPengaduan',
                                params: { id: row.id },
                              })
                            "
                            class="btn btn-info mb-0 text-xs"
                            data-toggle="tooltip"
                            data-original-title="Detail user"
                          >
                            <i class="fa fa-inbox" aria-hidden="true"></i>
                            Detail
                          </button>
                        </div>
                      </div>
>>>>>>> 0f77e8eb2491d02de2c3552a57ed5ff8a8eac857
                    </td>

                    <!-- <td class="align-middle">
                      
                    </td> -->
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
<<<<<<< HEAD
import { ref } from "vue";
const dataTable = ref([
  {
    judul: "Jalan Rusak",
    prioritas: "High",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "28 Januari 2023",
    status: "Selesai",
  },
  {
    judul: "Fasilitas Rusak",
    prioritas: "Medium",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "28 Januari 2023",
    status: "Diproses",
  },
  {
    judul: "Jalan Rusak",
    prioritas: "Low",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "28 Januari 2023",
    status: "Belum Diproses",
  },
]);
console.log(dataTable);
=======
/* eslint-disable */
import axios from "axios";
import { onMounted, ref } from "vue";
import { GetReports, GetReportsDetailById } from "../api.js";
import { useRouter } from "vue-router";
const router = useRouter();

const dataTable = ref([]);

// Triple Dot
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// onMounted(async () => {
//   dataTable.value = await GetReports();
//   console.log(dataTable.value);
// });
onMounted(() => {
  GetReports().then((data) => {
    dataTable.value = data;
    console.log(dataTable.value);
  });
});
>>>>>>> 0f77e8eb2491d02de2c3552a57ed5ff8a8eac857
</script>
