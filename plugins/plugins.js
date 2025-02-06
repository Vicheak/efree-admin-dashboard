import Toast, { POSITION, useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import Lightbox from "vue-easy-lightbox";
const toast = useToast();
import { Popover } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import "bootstrap/js/dist/dropdown.js";
import IFormHeader from "~/components/iComponents/IFormHeader";
import ISelect from "~/components/iComponents/ISelect.vue";
import IFormTable from "~/components/iComponents/IFormTable";
import IDropdown from "~/components/iComponents/IDropdown";
import IDropdownOption from "~/components/iComponents/IDropdownOption";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueApexCharts from "@/components/apexcharts.vue";
import Multiselect from "vue-multiselect";
import Popper from "vue3-popper";
import VMultiSelect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SimpleTypeahead);
  nuxtApp.vueApp.use(PerfectScrollbar);
  nuxtApp.vueApp.use(Popper);
  nuxtApp.vueApp.use(Toast);
  nuxtApp.provide("showToast", (params) =>
    toast[params.type || "sucsess"](params.msg || "default", {
      timeout: params.time || 2000,
      position: params.position || "top-right",
      icon: params.icon,
      closeOnClick: params.closeOnClick,
      onClick: () => {
        if (params.redirect) {
          const route = useRouter();
          history.replaceState({}, document.title, "/");
          return route.push({ path: "/" + params.redirect });
        }
      },
    })
  );
  nuxtApp.vueApp.config;
  nuxtApp.vueApp.use(Lightbox);
  nuxtApp.vueApp.provide("Popover", Popover);
  nuxtApp.vueApp.provide("Tooltip", Tooltip);
  nuxtApp.vueApp.component("DatePicker", VueDatePicker);
  nuxtApp.vueApp.component("IFormHeader", IFormHeader);
  nuxtApp.vueApp.component("IFormTable", IFormTable);
  nuxtApp.vueApp.component("IDropdown", IDropdown);
  nuxtApp.vueApp.component("IDropdownOption", IDropdownOption);
  nuxtApp.vueApp.component("apexchart", VueApexCharts);
  nuxtApp.vueApp.component("Multiselect", Multiselect);
  nuxtApp.vueApp.component("ISelect", ISelect);
  nuxtApp.vueApp.component("IPopper", Popper);
  nuxtApp.vueApp.component("VMultiSelect", VMultiSelect);
  // nuxtApp.vueApp.component('VueAwesomePaginate', VueAwesomePaginate);
  nuxtApp.vueApp.use(VueAwesomePaginate);
});
