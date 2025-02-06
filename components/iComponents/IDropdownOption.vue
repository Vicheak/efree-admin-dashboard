<template>
  <li @click="emit('click')">
    <a class="dropdown-item" href="#">
      <!-- <i :class="`icofont me-3 icofont-${props.icon}`"></i> -->
      <div class="d-flex align-items-center">
        <Icon
          v-if="props.icon"
          :name="props.icon"
          style="margin-right: 15px"
          size="18"
        />
        <slot></slot>
        <span v-if="props.label">{{ $t(props.label) }}</span>
      </div>
    </a>
  </li>
</template>
<script setup>
  const props = defineProps({
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
    },
  });

  const emit = defineEmits(["click"]);
</script>
