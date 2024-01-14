<!-- Comment.vue -->
<template>
  <div class="d-flex flex-start tree_label">
    <a class="me-3" href="#">
      <img
        class="rounded-circle shadow-1-strong"
        src="https://cdn.dribbble.com/users/1030477/screenshots/4704756/media/b0c16b938c5ff35cde82a63fa23c196f.gif"
        alt="avatar"
        width="65"
        height="65"
      />
    </a>
    <div class="flex-grow-1 flex-shrink-1">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1 font-weight-bold">
            {{ author_name }}
            <span class="small">- {{ formatDate(created_date) }}</span>
          </p>
          <a href="#!"
            ><i class="fas fa-reply fa-xs"></i
            ><span class="small"> balas</span></a
          >
        </div>
        <p class="small mb-0">
          {{ body }}
        </p>
      </div>
      <!-- replies -->
      <div v-if="child != undefined">
        <ul>
          <li v-for="row in child" :key="row">
            <Comment
              v-bind:author_name="row.author.name"
              v-bind:created_date="row.created_at"
              v-bind:body="row.body"
              v-bind:child="row.all_replies"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

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
  },
  methods: {
    formatDate: (date) => {
      moment.lang('id');
      return moment(date).fromNow();
    },
    // getClasses: (color, dismissible) => {
    //     let colorValue, dismissibleValue;
    //     colorValue = color ? `alert-${color}` : null;
    //     dismissibleValue = dismissible ? "alert-dismissible fade show" : null;
    //     return `${colorValue} ${dismissibleValue}`;
    // },
    // getIcon: (icon) => (icon ? icon : null),
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
