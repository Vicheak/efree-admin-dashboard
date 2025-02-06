<template>
  <input
    class="form-check-input"
    type="checkbox"
    v-model="selected"
    :true-value="true"
    :false-value="false"
    @change="handleSelectedItem"
  />
</template>
<script setup>
  const props = defineProps({
    item: {
      default: () => null,
      type: Object,
    },
    value: {
      default: () => true,
      type: Boolean,
    },
    selectAll: {
      default: () => false,
      type: Boolean,
    },
  });
  const emit = defineEmits(["onSelectItem"]);
  const selected = ref(props.selectAll);

  watch(
    () => props.selectAll,
    () => {
      selected.value = props.selectAll;
    }
  );

  const handleSelectedItem = () => {
    emit("onSelectItem", selected.value, props.item);
  };
</script>
