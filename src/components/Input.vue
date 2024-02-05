<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {},
  name: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  errorList: {
    type: Object,
  },
});

const modelValue = ref(null);
const error = ref(false);

const emit = defineEmits(["update:modelValue", "update:errorList"]);

watch(modelValue, (newModelValue) => {
  emit("update:modelValue", newModelValue);

  if (!props.isRequired) return;
  const isValid = newModelValue?.length > 0;
  error.value = !isValid;
  emit("update:errorList", { ...props.errorList, [props.name]: !isValid });
});
</script>

<template>
  <input
    class="form-control"
    :class="{ 'is-invalid': error }"
    type="text"
    :name="props.name"
    v-model="modelValue"
    :placeholder="props.placeholder"
  />
</template>
