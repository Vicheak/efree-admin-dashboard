<template>
  <div>
    <div class="loader-wrapper" v-if="loading">
      <span class="loader"></span>
    </div>
    <slot v-else />
  </div>

</template>
<script>
export default {
  data() {
    return {
      loading: true
    }
  },

  mounted() {
    this.loading = false
    const langCode = localStorage.getItem("currentLanguage")
    document.body.classList.add('lang-' + langCode)
  }
}
</script>
