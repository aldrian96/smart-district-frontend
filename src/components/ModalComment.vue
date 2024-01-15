<template>
  <div class="modal-content">
    <!-- <button
      class="btn btn-sm border-0 pull-right my-2 mx-2"
      data-bs-dismiss="modal"
      aria-label="Close"
    >
      <i class="fa fa-window-close fa-fw"></i>
    </button> -->
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">
        <div class="d-flex flex-start tree_label">
          <a class="me-3" href="#">
            <img
              class="rounded-circle border border-secondary shadow-sm"
              :src="
                'http://localhost:8000/api/image?attachment_path=' +
                profile_picture_path
              "
              alt="avatar"
              width="65"
              height="65"
            />
          </a>
          <div class="flex-grow-1 flex-shrink-1">
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-1 font-weight-bold">
                {{ author_name }}
                <span class="small">- {{ formatDate(created_date) }}</span>
              </p>
            </div>
            <p class="small mb-0">
              {{ body }}
            </p>
          </div>
        </div>
      </h1>
    </div>
    <div class="modal-body">
      <div class="panel">
        <div class="panel-body">
          <textarea
            class="form-control"
            rows="2"
            :placeholder="'Balasan anda kepada ' + author_name + '...'"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="mar-top clearfix">
        <button class="btn btn-sm btn-primary pull-right my-2" type="submit">
          <i class="fa fa-pencil fa-fw"></i> Tambahkan
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "modalcomment",
  props: {
    author_name: {
      type: String,
      default: "unknown",
    },
    body: {
      type: String,
      default: "",
    },
    created_date: {
      type: String,
      default: "",
    },
    child: {
      type: Array,
    },
    profile_picture_path: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  methods: {
    formatDate: (date) => {
      moment.lang("id");
      return moment(date).fromNow();
    },

    callModal: (id) => {
      console.log(id);
    },
  },
};
</script>
<style></style>
