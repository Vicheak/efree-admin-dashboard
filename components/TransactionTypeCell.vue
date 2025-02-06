<template>
  <div>
    <span :class="{ 'badge ': true, ['badge-' + color[props.type]]: true }">
      {{ $t(transactionTypeEnum.getKey(type)) }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    type: String | Number,
  });
  const color = reactive({
    1: "success",
    2: "danger",
    3: "primary",
    4: "warning",
    5: "success",
    6: "danger",
    7: "success",
    8: "danger",
    9: "danger",
    10: "danger",
    11: "danger",
    12: "success",
    13: "danger",
    14: "danger",
    15: "success",
    16: "success",
  });
</script>

<style>
  .color-1 {
    color: var(--theme-default);
  }
  .color-2 {
    color: var(--bs-red);
  }
  .color-3 {
    color: var(--bs-green);
  }
</style>
