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
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Judul Pengaduan
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Prioritas
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Tanggal
                    </th>
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Balasan
                    </th>
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Balasan Terakhir
                    </th>
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Status Pengaduan
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
                            <a href="#">{{ row.judul }}</a>
                            <!-- {{ row.judul }} -->
                          </h6>
                          <p class="text-xs text-secondary mb-0">
                            {{ row.deskripsi }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm" :class="{
                        'bg-gradient-info': row.prioritas == 'Low',
                        'bg-gradient-warning': row.prioritas == 'Medium',
                        'bg-gradient-danger': row.prioritas == 'High',
                      }">{{ row.prioritas }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ row.tanggal }}
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ row.reply }}
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ row.lastReply }}
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm" :class="{
                        'bg-gradient-success': row.status == 'Selesai',
                        'bg-gradient-warning': row.status == 'Diproses',
                        'bg-gradient-secondary':
                          row.status == 'Belum Diproses',
                      }">{{ row.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-4 row">
      <div class="col-12">
        <projects-table />
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
const dataTable = ref([
  {
    judul: "Jalan Rusak",
    prioritas: "High",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "28 Januari 2023",
    status: "Selesai",
    reply: 1,
    lastReply: "2023-12-19 06:22:12",
  },
  {
    judul: "Fasilitas Rusak",
    prioritas: "Medium",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "28 Januari 2023",
    status: "Diproses",
    reply: 1,
    lastReply : "2023-05-19 04:29:47",
  },
  {
    judul: "Jalan Rusak",
    prioritas: "Low",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "28 Januari 2023",
    status: "Belum Diproses",
    reply: 5,
    lastReply : "2023-05-24 17:28:12",
  },
]);
console.log(dataTable);
</script>
