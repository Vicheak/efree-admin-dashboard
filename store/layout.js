/* eslint-disable */
import { useLocalStorage } from "@vueuse/core";
import { useStorage } from "@vueuse/core";
import Layout from "@/data/layout.json";
import Cookies from 'js-cookie';
export const useLayoutStore = defineStore({
  id: "layout",
  state: () => {
    return {
      layout: Layout,
      sidebarType: Cookies.get('SidebarType'),
      boxlayout: true,
      footer: "",
      svg: "stroke-svg",
      sidebar: Cookies.get('SidebarType'),
      primaryColor: "#00a6ff",
      secondaryColor: "#F1C959",
    };
  },
  getters: {
    footer123: (state) => {
      return state.footer;
    },
    sidebar123: (state) => {
      return state.sidebar;
    },
    PColor: (state) => {
      return state.primaryColor;
    },
  },
  actions: {
    intialChange(payload) {
      this.primaryColor = payload.localPrimaryColor;
      this.secondaryColor = payload.localSecondaryColor;
    },
    setFooter(payload) {
      this.footer = payload.class;
    },
    set() {
      if (process.client) {
        document.body.className = this.layout.color.mix_layout;
        document.body.setAttribute("main-theme-layout", "compact-wrapper");
        document
          .getElementsByTagName("html")[0]
          .setAttribute("dir", this.layout.settings.layout_type);
        let primaryColor = this.primaryColor || this.layout.color.primary_color;
        let secondaryColor =
          this.secondaryColor || this.layout.color.secondary_color;
        let layoutVersion =
          Cookies.get("layoutVersion") ||
          this.layout.color.layout_version;
        if (primaryColor || secondaryColor) {
          addStyle(primaryColor, secondaryColor);
          if (layoutVersion) document.body.className = layoutVersion;
        }
      }
    },
    setLayoutType(payload) {
      document.body.classList.remove("rtl");
      document.body.classList.remove("ltr");
      document.body.classList.remove("boxed");
      document.documentElement.removeAttribute("dir");
      payload.class && document.body.setAttribute("class", payload.class);
      payload.class &&
        document.documentElement.setAttribute("dir", payload.class);

      this.layout.settings.layout_type = payload;
    },
    setLayout(payload) {
      if (document.body.className == "box-layout") {
        document.body.className = "box-layout " + payload.class;
      } else {
        document.body.className = payload.class;
      }
    },
    setColorScheme(payload) {
      setColor(payload);
      this.primaryColor = payload.primary;
      this.secondaryColor = payload.secondary;
      this.layout.color.layout_version = "light";

      if (process.client) {
        Cookies.set("layoutVersion", this.layout.color.layout_version,{expires:365});
      }
    },
    setColorDarkScheme(payload) {
      setColor(payload);
      this.layout.color.layout_version = "dark-only";
      if (process.client) {
        Cookies.set("layoutVersion", this.layout.color.layout_version,{expires:365});
      }
    },

    setCustomizeSidebarType(payload) {
      if (process.client) {
        Cookies.set("SidebarType", payload,{expires:365});
      }
    },
    setSvg(payload) {
      this.svg = payload;
      this.layout.settings.sidebar_setting = payload;
    },
  },
  persist: true,
});

function addStyle(primary, secondary) {
  document.documentElement.style.setProperty("--theme-default", primary);
  document.documentElement.style.setProperty("--theme-secondary", secondary);
}

function setColor(color) {
  useLayoutStore().primaryColor = color.primary;
  useLayoutStore().secondaryColor = color.secondary;
  if (process.client) {
    addStyle(color.primary, color.secondary);
  }
}
