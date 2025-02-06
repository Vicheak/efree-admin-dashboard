<template>
  <Multiselect
    v-model="value"
    :options="props.options"
    :searchable="props.searchable"
    :showLabels="props.showLabels"
    :multiple="props.multiple"
    :track-by="props.trackBy"
    :label="props.label"
    :optionsLimit="props.optionsLimit"
    :custom-label="props.customLabel"
    @search-change="asyncFind"
  >
    <template #beforeList>
      <div
        @click="reset"
        class="text-left"
        style="padding: 10px; cursor: pointer"
      >
        <i class="iconsminds-repeat-2"></i>
        <span class="w-100">{{ $t("reset") }}</span>
      </div>
    </template>
    <template #singleLabel="{ option }">
      <slot name="singleLabel" :option="option"></slot>
    </template>
    <template #option="{ option }">
      <slot name="option" :option="option"></slot>
    </template>
  </Multiselect>
</template>
<script setup>
  import Multiselect from "vue-multiselect";
import "@vueform/multiselect/themes/default.css";
  const props = defineProps({
    modelValue: {
      default: null,
    },
    item: {
      default: () => null,
      type: Object,
    },
    value: {
      default: () => true,
      type: Boolean,
    },
    options: {
      default: () => false,
      type: Array,
    },
    searchable: {
      default: () => true,
      type: Boolean,
    },
    showLabels: {
      default: () => false,
      type: Boolean,
    },
    closeOnSelect: {
      default: () => false,
      type: Boolean,
    },
    multiple: {
      default: () => false,
      type: Boolean,
    },
    enableCaret: {
      default: () => false,
      type: Boolean,
    },
    trackBy: {
      default: () => "name",
      type: String,
    },
    label: {
      default: () => "name",
      type: String,
    },
    optionsLimit: {
      default: () => 5,
      type: Number,
    },
    customLabel: {
      default: () => () => {},
      type: Function,
    },
  });

  const emit = defineEmits(["onSelectItem", "onSearchChange"]);
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

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      // emit("dateChange", moment(value).format("YYYY-MM-DD HH:mm:ss"));
      emit("update:modelValue", value);
    },
  });

  function asyncFind(query) {
    emit("onSearchChange", { search: query });
  }

  function reset() {
    props.modelValue = [];
  }
</script>