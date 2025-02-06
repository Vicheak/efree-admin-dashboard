<template>
  <div>
    <div class="logo-wrapper">
      <LogoSideBar />
      <div class="back-btn" @click="toggle_sidebar">
        <i class="fa fa-angle-left for-light"></i>
        <i class="fa fa-angle-left for-dark" style="color: #95969b"></i>
      </div>
      <div class="toggle-sidebar" @click="toggle_sidebar">
        <Icon
          class="for-light"
          name="streamline:interface-dashboard-layout-square-app-application-dashboard-home-layout-square"
        />
        <Icon
          class="for-dark"
          name="streamline:interface-dashboard-layout-square-app-application-dashboard-home-layout-square"
          color="#95969b"
        />
      </div>
    </div>
    <div class="logo-icon-wrapper" style="width: 90px">
      <router-link to="/">
        <img
          class="img-fluid"
          src="/images/e-free-logo.png"
          alt=""
        />
      </router-link>
    </div>
    <Nav />
  </div>
</template>
<script>
import { mapState } from "pinia";
import LogoSideBar from "./logo.vue";
import Nav from "./nav.vue";
import { useMenuStore } from "~~/store/menu";

export default {
  name: "Sidebar",
  components: {
    LogoSideBar,
    Nav,
  },
  computed: {
    ...mapState(useMenuStore, {
      menuItems: "data",
      activeoverlay: "activeoverlay",
    }),
  },
  methods: {
    toggle_sidebar() {
      useMenuStore().opensidebar();
      useMenuStore().activeoverlay = false;
    },
  },
};
</script>
<style>
.logo-wrapper,
.logo-icon-wrapper {
  padding: 6px 30px;
  box-shadow: -9px 0 20px rgba(#59667a, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
