<template>
  <div
    class="tab-pane fade"
    :class="{ 'active show': customizer == 'settings' }"
    id="c-pills-home"
  >
    <div class="d-flex justify-content-between">
      <h4>{{ $t("settings") }}</h4>
      <button class="btn" @click="closeCustom">
        <Icon name="material-symbols:close-rounded" size="20"></Icon>
      </button>
    </div>

    <h6 class="">Sidebar type</h6>
    <ul class="sidebar-type layout-grid">
      <li
        data-attr="normal-sidebar"
        @click="customizeSidebarSetting('horizontal-wrapper', 'horizontal')"
      >
        <div class="header bg-light">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="body">
          <ul>
            <li class="bg-dark sidebar"></li>
            <li class="bg-light body"></li>
          </ul>
        </div>
      </li>
      <li
        data-attr="compact-sidebar"
        :class="{
          active: layout.settings.sidebar_setting == 'compact-sidebar1',
        }"
        @click="customizeSidebarSetting('compact-wrapper', 'Dubai')"
      >
        <div class="header bg-light">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="body">
          <ul>
            <li class="bg-dark sidebar compact"></li>
            <li class="bg-light body"></li>
          </ul>
        </div>
      </li>
    </ul>

    <!-- <h6 class="">Unlimited Color</h6>
    <ul class="layout-grid unlimited-color-layout">
      <input id="ColorPicker1" type="color" value="#00a6ff" name="Background" />
      <input id="ColorPicker2" type="color" value="#F1C959" name="Background" />
      <button
        class="color-apply-btn btn btn-primary color-apply-btn"
        @click.prevent="customizeColor"
      >
        Apply
      </button>
    </ul> -->
    <h6 class="">Mix Layout</h6>
    <ul class="layout-grid customizer-mix">
      <li
        class="color-layout"
        data-attr="light-only"
        :class="{ active: mixLayout == 'light-only' }"
        @click="customizeMixLayout('light-only')"
      >
        <div class="header bg-light">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="body">
          <ul>
            <li class="bg-light sidebar"></li>
            <li class="bg-light body"></li>
          </ul>
        </div>
      </li>
      <li
        class="color-layout"
        data-attr="dark-sidebar"
        :class="{ active: mixLayout == 'dark-sidebar' }"
        @click="customizeMixLayout('dark-sidebar')"
      >
        <div class="header bg-light">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="body">
          <ul>
            <li class="bg-dark sidebar"></li>
            <li class="bg-light body"></li>
          </ul>
        </div>
      </li>
      <li
        class="color-layout"
        data-attr="dark-only"
        :class="{ active: mixLayout == 'dark-only' }"
        @click="customizeMixLayout('dark-only')"
      >
        <div class="header bg-dark">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="body">
          <ul>
            <li class="bg-dark sidebar"></li>
            <li class="bg-dark body"></li>
          </ul>
        </div>
      </li>
    </ul>

    <!-- <h6>IP Address</h6>
    <button class="btn btn-primary" @click="navigateTo('/users/ip-address')">
      {{ $t("ip_address") }}
    </button> -->
  </div>
</template>
<script>
import { mapState } from "pinia";
import { useLayoutStore } from "~~/store/layout";
import { layoutClasses } from "../../constants/layout";
import { useMenuStore } from "~~/store/menu";
import Cookies from "js-cookie";
export default {
  name: "CustomSetting",
  data() {
    return {
      layoutType: "ltr",
      mixLayout: "default",
    };
  },
  mounted() {
    const layoutobj = Cookies.get("layoutobj");
    if (layoutobj) {
      useLayoutStore().setCustomizeSidebarType(layoutobj);
    }

    const colorMode = Cookies.get("colorMode");
    if (colorMode) {
      useLayoutStore().setColorScheme({
        primary: colorMode.primary,
        secondary: colorMode.secondary,
      });
    }

    const mixLayout = Cookies.get("mixLayout");
    if (mixLayout) {
      useLayoutStore().setLayout({ class: mixLayout });
    }
  },
  computed: {
    ...mapState(useMenuStore, {
      customizer: "customizer",
    }),
    ...mapState(useLayoutStore, {
      layout: "layout",
    }),
    boxlayout() {
      return useLayoutStore().boxlayout;
    },
    data() {
      return JSON.stringify(useLayoutStore().layout);
    },
  },
  methods: {
    customizeLayoutType(val) {
      useLayoutStore().setLayoutType({ class: val, val: true });

      this.layoutType = val;
    },
    customizeSidebarSetting(val, layout) {
      const layoutobj = layoutClasses.find(
        (item) => Object.keys(item).pop() === layout
      );
      useLayoutStore().setCustomizeSidebarType(layoutobj[layout]);
      Cookies.set("layoutobj", layout, { expires: 365 });
      this.layout.settings.layout = layout;
      this.$router.push({ query: { layout: layout } }).catch((err) => err);
      useMenuStore().customizer = "";
    },
    customizeColor() {
      if (process.client) {
        const primary = document.getElementById("ColorPicker1").value;
        const secondary = document.getElementById("ColorPicker2").value;
        Cookies.set(
          "colorMode",
          JSON.stringify({
            primary: primary,
            secondary: secondary,
          }),
          { expires: 365 }
        );
      }

      useLayoutStore().setColorScheme({ primary, secondary });
      useMenuStore().customizer = "";
    },
    customizeMixLayout(val) {
      this.mixLayout = val;
      Cookies.set("mixLayout", val, { expires: 365 });
      useLayoutStore().setLayout({ class: val });
      useMenuStore().customizer = "";
    },
    customSvg(val) {
      useLayoutStore().setSvg(val);
    },
    closeCustom() {
      useMenuStore().customizer = "";
    },
  },
};
</script>
