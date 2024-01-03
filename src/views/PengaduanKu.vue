<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <h6>Tabel Pengaduan</h6>
              <button
                class="btn btn-success d-flex align-items-center"
                @click="router.push({ name: 'Tambah' })"
              >
                <i class="ni ni-fat-add fs-4"></i> Tambah Pengaduan
              </button>
            </div>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const dataTable = ref([
  {
    judul: "Kerusakan Lampu Jalan",
    prioritas: "High",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "15 Februari 2023",
    status: "Diproses",
  },
  {
    judul: "Kebersihan Lingkungan",
    prioritas: "Medium",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "20 Februari 2023",
    status: "Belum Diproses",
  },
  {
    judul: "Kebocoran Pipa Air",
    prioritas: "Low",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "25 Februari 2023",
    status: "Belum Diproses",
  },
  {
    judul: "Pohon Tumbang",
    prioritas: "High",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "5 Maret 2023",
    status: "Selesai",
  },
  {
    judul: "Kerusakan Saluran Drainase",
    prioritas: "Medium",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "10 Maret 2023",
    status: "Diproses",
  },
  {
    judul: "Kebisingan Lingkungan",
    prioritas: "Low",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "15 Maret 2023",
    status: "Belum Diproses",
  },
  {
    judul: "Gangguan Listrik",
    prioritas: "High",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "20 Maret 2023",
    status: "Diproses",
  },
  {
    judul: "Kerusakan Jaringan Telekomunikasi",
    prioritas: "Medium",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "25 Maret 2023",
    status: "Belum Diproses",
  },
  {
    judul: "Pemotongan Pohon Illegal",
    prioritas: "Low",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "1 April 2023",
    status: "Belum Diproses",
  },
  {
    judul: "Banjir Kecil",
    prioritas: "High",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur",
    tanggal: "5 April 2023",
    status: "Selesai",
  },
]);

console.log(dataTable);
</script>
