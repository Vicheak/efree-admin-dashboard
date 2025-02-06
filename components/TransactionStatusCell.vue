<template>
  <div>
    <span :class="{ 'badge ': true, ['badge-' + color[props.type]]: true }">
      {{ $t(transactionStatusEnum.getKey(type)) }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    type: String | Number,
  });
  const color = reactive({
    0: "danger",
    1: "warning",
    2: "success",
    3: "primary",
    4: "dark",
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
