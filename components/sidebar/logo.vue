<template>
  <router-link to="/">
    <img class="img-fluid for-light " src="/images/e-free-logo.png" alt="" />
    <img class="img-fluid for-dark " src="/images/e-free-logo.png" alt="" />
  </router-link>
</template>
<script>
  export default {
    name: "LogoSideBar",
  };
</script>
<style scoped>
a{
  display: inline-block;
}
  img{
    height: 68px !important;
  }
</style>
