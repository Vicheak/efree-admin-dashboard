<template>
  <div class="dropdown">
    <button
      class="btn btn-primary p-1"
      :style="{
        backgroundColor: props.bgColor + '!important',
        color: props.color,
        borderColor: props.bgColor + '!important',
      }"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <div class="d-flex">
        <span v-if="props.content">{{ $t(props.content) }}</span>
        <span v-if="props.hasIcon"><Icon :name="props.icon" /></span>
        <span class="ms-1"><Icon name="fluent:caret-down-20-filled" /></span>
      </div>
    </button>
    <ul
      class="dropdown-menu"
      style="
        position: absolute;
        inset: 0px auto auto 0px;
        margin: 0px;
        transform: translate3d(0px, 37px, 0px);
      "
      data-popper-placement="bottom-start"
    >
      <slot></slot>
    </ul>
  </div>
</template>
<script setup>
  const props = defineProps({
    icon: {
      type: String,
      default: "mdi:tools",
    },
    content: {
      type: String,
      default: "",
    },
    hasIcon: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: "#00a6ff",
    },
    color: {
      type: String,
      default: "#ffffff",
    },
  });
</script>
