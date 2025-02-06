<template>
  <div class="header-logo-wrapper col-auto p-0">
    <div class="logo-wrapper">
      <router-link to="/">
        <img class="img-fluid" src="/images/e-free-logo.png" width="70%" alt="" />
      </router-link>
    </div>
    <div class="toggle-sidebar d-lg-none" @click="toggle_sidebar">
      <Icon name="quill:hamburger-sidebar" />
    </div>
  </div>
</template>

<script>
import { useMenuStore } from "~~/store/menu";
export default {
  name: "Logo",
  methods: {
    toggle_sidebar() {
      useMenuStore().opensidebar();
    },
  },
};
</script>
