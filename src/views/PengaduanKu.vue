<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <h6>Pengaduanku</h6>
              <button
                class="btn btn-success d-flex align-items-center"
                @click="router.push({ name: 'tambahPengaduanku' })"
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
                    <th
                      class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in dataTable"
                    :key="row"
                    data-aos="fade-in"
                    data-aos-once="true"
                    :data-aos-delay="i * 100"
                  >
                    <td>
                      <div class="d-flex p-2 ps-3">
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
                          'bg-gradient-secondary': row.priority == 'unknown',
                        }"
                        >{{
                          row.priority == "unknown"
                            ? "Menunggu Konfirmasi"
                            : row.priority
                        }}</span
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
                          'bg-gradient-secondary':
                            row.status == 'Belum di Proses',
                        }"
                        >{{ row.status }}</span
                      >
                    </td>
                    <td class="align-middle">
                      <div class="d-flex justify-content-center">
                        <div class="me-2">
                          <button
                            @click="
                              router.push({
                                name: 'editPengaduanku',
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
                        <div class="me-2">
                          <button
                            @click="
                              router.push({
                                name: 'Thread',
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

                        <div>
                          <button
                            class="btn btn-danger mb-0 text-xs"
                            data-toggle="tooltip"
                            data-original-title="Detail user"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                            Delete
                          </button>
                        </div>

                        <!-- Modal -->
                        <div
                          class="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1
                                  class="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Apakah anda Yakin?
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">...</div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="deletePengaduan(row.id)"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
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
    <div class="mt-4 row">
      <div class="col-12">
        <!-- <projects-table /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { GetReportsByUser, GetReports } from "../api.js";
import { deleteReports, GetDetailsHeadless } from "../api.js";
import Swal from "sweetalert2";

const router = useRouter();

const dataTable = ref([]);

// Triple Dot
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
const deletePengaduan = async (id) => {
  try {
    // Panggil fungsi updateReports untuk menambahkan pengaduan
    const response = await deleteReports(id);
    console.log(response);
    // Handle respon dari backend
    if (response.success === "OK") {
      console.log("Pengaduan berhasil ditambahkan");
      Swal.fire({
        title: "Hore!",
        text: "Berhasil Menghapus Laporan!",
        icon: "success",
      });
      // Redirect ke halaman Pengaduanku setelah berhasil menambahkan
      router.go();
    } else {
      console.error("Gagal Menghapus pengaduan", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
onMounted(async () => {
  dataTable.value = await GetReportsByUser();
  console.log(dataTable.value);
});
console.log(dataTable);
// onMounted(() => {
//   GetReportsByUser().then((data) => {
//     dataTable.value = data;
//     console.log(dataTable.value);
//   });
// });
</script>
