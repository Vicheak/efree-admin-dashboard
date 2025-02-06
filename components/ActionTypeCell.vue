<template>
  <div>
    <span :class="{ 'badge ': true, ['badge-' + color[props.type]]: true }">
      {{ $t(actionTypeEnum.getKey(type)) }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    type: String | Number,
  });
  const color = reactive({
    1: "success",
    2: "primary",
    3: "danger",
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
