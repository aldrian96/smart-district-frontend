<!-- Comment.vue -->
<template>
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
      <div>
        <div
          class="d-flex justify-content-between align-items-center"
          id="to-hover"
        >
          <p class="mb-1 font-weight-bold">
            {{ author_name }}
            <span class="small">- {{ formatDate(created_date) }}</span>
          </p>
          <button
            class="btn btn-transparent shadow-none border-none w-100"
            :data-bs-toggle="'modal'"
            :data-bs-target="'#modalComment' + id"
            id="to-show"
          >
            <i class="fas fa-reply fa-xs"></i><span class="small"> balas</span>
          </button>
          <!-- Modal -->
          <div
            class="modal fade"
            :id="'modalComment' + id"
            tabindex="-1"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <ModalComment
                  v-bind:id="id"
                  v-bind:profile_picture_path="profile_picture_path"
                  v-bind:author_name="author_name"
                  v-bind:created_date="created_date"
                  v-bind:body="body"
                  v-bind:report_id="report_id"
                />
              </div>
            </div>
          </div>
        </div>
        <p class="small mb-0">
          {{ body }}
        </p>
      </div>
      <!-- replies -->
      <ul>
        <li v-for="row in child" :key="row">
          <Comment
            v-bind:id="row.id"
            v-bind:profile_picture_path="row.author.profile_picture_path"
            v-bind:author_name="row.author.name"
            v-bind:created_date="row.created_at"
            v-bind:body="row.body"
            v-bind:child="row.all_replies"
            v-bind:report_id="report_id"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ModalComment from "@/components/ModalComment.vue";

// let name = this.author_name;
export default {
  name: "comment",
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
    report_id: {
      type: Number,
    },
  },
  data: function () {
    return {
      currentModal: null,
    };
  },
  components: {
    ModalComment,
  },
  methods: {
    formatDate: (date) => {
      moment.locale("id");
      return moment(date).fromNow();
    },
    changeModalValue(Modal) {
      this.currentModal = Modal;
    },
  },
};
</script>

<style scoped>
/* ————————————————————–
  Tree core styles
*/
ul {
  list-style-type: none;
}
#to-show {
  display: none;
}
#to-hover:hover > #to-show {
  display: block;
}
#to-show {
  float: right;
  position: absolute;
  right: 0;
}
ul input {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

ul input ~ ul {
  display: none;
}

ul input:checked ~ ul {
  display: block;
}

/* ————————————————————–
  Tree rows
*/
ul li {
  line-height: 1.2;
  position: relative;
  padding: 0 0 1em 1em;
}

ul ul li {
  padding: 1 0 0 1em;
}

ul > li:last-child {
  padding-bottom: 0;
}

/* ————————————————————–
  Tree labels
*/
.tree_label {
  position: relative;
  display: inline-block;
}

label.tree_label {
  cursor: pointer;
}

label.tree_label:hover {
  color: #666;
}

/* ————————————————————–
  Tree expanded icon
*/
label.tree_label:before {
  background: #000;
  color: #fff;
  position: relative;
  z-index: 1;
  float: left;
  margin: 0 1em 0 -2em;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  content: "+";
  text-align: center;
  line-height: 0.9em;
}

:checked ~ label.tree_label:before {
  content: "–";
}

/* ————————————————————–
  Tree branches
*/
ul li:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -0.5em;
  display: block;
  width: 0;
  border-left: 1px solid #777;
  content: "";
}

.tree_label:after {
  position: absolute;
  top: 0;
  left: -1.5em;
  display: block;
  height: 0.5em;
  width: 1em;
  border-bottom: 1px solid #777;
  border-left: 1px solid #777;
  border-radius: 0 0 0 0.3em;
  content: "";
}
.tombol {
  text-decoration: none;
}
.tombol:hover {
  text-decoration: underline;
}
label.tree_label:after {
  border-bottom: 0;
}

:checked ~ label.tree_label:after {
  border-radius: 0 0.3em 0 0;
  border-top: 1px solid #777;
  border-right: 1px solid #777;
  border-bottom: 0;
  border-left: 0;
  bottom: 0;
  top: 0.5em;
  height: auto;
}

ul li:last-child:before {
  height: 1em;
  bottom: auto;
}

ul > li:last-child:before {
  display: none;
}

.tree_custom {
  display: block;
  background: #eee;
  padding: 1em;
  border-radius: 0.3em;
}

a:hover {
  text-decoration: underline;
}
</style>
