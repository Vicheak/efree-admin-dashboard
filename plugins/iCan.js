export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("can", {
    mounted(el, binding) {
      if (binding.arg === "not") {
        if (hasPermission(binding.value)) {
          el.remove();
        }
        return;
      }
      if (!hasPermission(binding.value)) {
        el.remove();
      }
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {};
    },
  });
});
