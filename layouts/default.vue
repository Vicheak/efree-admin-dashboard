<template>
  <div>
    <div class="loader-index"><span></span></div>
    <div class="page-wrapper" id="pageWrapper" :class="layoutobj">
      <div class="page-header" :class="{ close_icon: !togglesidebar }">
        <Header @clicked="sidebar_toggle" />
      </div>

      <div class="page-body-wrapper">
        <div
          class="sidebar-wrapper"
          :class="[{ close_icon: !togglesidebar }]"
          :sidebar-layout="svg == 'stroke-svg' ? 'stroke-svg' : 'fill-svg'"
        >
          <Sidebar @clicked="sidebar_toggle" />
        </div>
        <div class="page-body" @click="hidesecondmenu()">
          <slot></slot>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
      <Customizer />
      <Teleport to="body">
        <TapTop />
      </Teleport>
      <!-- {{ console.log(inProgress) }} -->
      <loading
        v-if="inProgress"
        loader="Dots"
        v-model:active="inProgress"
        :can-cancel="true"
        :is-full-page="true"
        :height="100"
        :width="100"
        color="#04A5FF"
      />
    </div>
    <ProfileModal />
  </div>
</template>
<script>
  import { mapState } from "pinia";

  import { layoutClasses } from "../constants/layout";
  import Header from "@/components/header";
  import Sidebar from "@/components/sidebar";
  import Footer from "@/components/footer.vue";
  import { useLayoutStore } from "~~/store/layout";
  import { useMenuStore } from "~~/store/menu";
  import Customizer from "@/components/customizer";
  import TapTop from "@/components/tapTop.vue";
  import { useWindowScroll } from "@vueuse/core";
  import ProfileModal from "~/components/users/profile-modal.vue";
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/css/index.css";
  import { useLoadingStore } from "~/store/loading";
  import Cookies from "js-cookie";
  export default {
    setup(props) {},
    // props: ["sidebar_toggle_var"],
    components: {
      Loading,
      Header,
      Sidebar,
      Footer,
      Customizer,
      TapTop,
      ProfileModal,
    },
    data() {
      return {
        loading: true,
        mobileheader_toggle_var: false,
        sidebar_toggle_var: false,
        horizontal_Sidebar: true,
        resized: false,
        layoutobj: {},
        sidebarType: Cookies.get("SidebarType"),
      };
    },

    computed: {
      ...mapState(useMenuStore, {
        menuItems: "data",
        togglesidebar: "togglesidebar",
        activeoverlay: "activeoverlay",
      }),
      ...mapState(useLoadingStore, {
        inProgress: "in_progress",
      }),
      ...mapState(useLayoutStore, {
        layout: "layout",
        svg: "svg",
      }),

      isLoading() {
        if (this.inProgress === true) return false;
        else if (this.inProgresss === false) return true;
      },

      sidebar() {
        return useLayoutStore().sidebar;
      },
      layoutobject: {
        get: function () {
          return JSON.parse(
            JSON.stringify(
              layoutClasses.find(
                (item) =>
                  Object.keys(item).pop() === this.layout.settings.layout
              )
            )
          )[this.layout.settings.layout];
        },
        set: function () {
          this.layoutobj = layoutClasses.find(
            (item) => Object.keys(item).pop() === this.layout.settings.layout
          );
          this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[
            this.layout.settings.layout
          ];
          return this.layoutobj;
        },
      },
    },
    watch: {
      $route() {
        // setTimeout(() => {
        //     this.loading = !this.loading;
        // }, 3000);
        // this.loading = !this.loading;

        // this.menuItems.filter((items) => {
        //   if (items.path === this.$route.path)
        //     useMenuStore().setActiveRoute(items);
        //   if (!items.children) return false;
        //   items.children.filter((subItems) => {
        //     if (subItems.path === this.$route.path)
        //       useMenuStore().setActiveRoute(subItems);
        //     if (!subItems.children) return false;
        //     subItems.children.filter((subSubItems) => {
        //       if (subSubItems.path === this.$route.path)
        //         useMenuStore().setActiveRoute(subSubItems);
        //     });
        //   });
        // });
        this.layoutobj = layoutClasses.find(
          (item) => Object.keys(item).pop() === this.layout.settings.layout
        );

        if (
          (useWindowScroll().x < 991 &&
            this.layout.settings.layout === "LosAngeles") ||
          (useWindowScroll().x < 991 &&
            this.layout.settings.layout === "Singapore") ||
          (useWindowScroll().x < 991 &&
            this.layout.settings.layout === "horizontal")
        ) {
          const newlayout = JSON.parse(
            JSON.stringify(this.layoutobj).replace(
              "horizontal-wrapper",
              "compact-wrapper"
            )
          );

          this.layoutobj = JSON.parse(JSON.stringify(newlayout))[
            this.layout.settings.layout
          ];
        } else {
          this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[
            this.layout.settings.layout
          ];
        }
      },
      sidebar_toggle_var: function () {
        this.resized =
          window.innerWidth <= 991
            ? !this.sidebar_toggle_var
            : this.sidebar_toggle_var;
      },
    },
    created() {
      // Call any necessary initialization methods
      this.handleResize();
      this.resized = this.sidebar_toggle_var;
      useLayoutStore().set();

      // Check if there's a cookie set for the layout preference
      const layoutCookie = Cookies.get("layoutobj");

      // If a layout preference cookie exists, use it; otherwise, default to "Dubai"
      if (layoutCookie) {
        this.layout.settings.layout = layoutCookie;
      } else {
        this.layout.settings.layout = "Dubai";
      }

      // Clear any query parameters from the route
      this.$router.replace({ query: null }).catch((err) => err);

      // Check if there's a layout query parameter in the route and use it if present; otherwise, use the layout from the cookie or default to "Dubai"
      const layoutQuery = this.$route.query.layout
        ? this.$route.query.layout
        : this.layout.settings.layout;

      // Find the layout object corresponding to the layout
      const layoutObj = layoutClasses.find((item) =>
        Object.keys(item).includes(layoutQuery)
      );

      // Get the layout class corresponding to the layout, defaulting to "Dubai" if not found
      this.layoutobj = layoutObj
        ? layoutObj[layoutQuery]
        : layoutClasses.find((item) => Object.keys(item).includes("Dubai"))[
            "Dubai"
          ];
    },

    mounted() {
      const langCode = localStorage.getItem("currentLanguage");
      document.body.classList.add("lang-" + langCode);
    },
    methods: {
      sidebar_toggle(value) {
        this.sidebar_toggle_var = !value;
      },
      mobiletoggle_toggle(value) {
        this.mobileheader_toggle_var = value;
      },
      handleResize() {
        useMenuStore().resizetoggle();
      },
      removeoverlay() {
        useMenuStore().activeoverlay = false;
        if (useWindowScroll().x < 991) {
          useMenuStore().togglesidebar = false;
        }
        this.menuItems.filter((menuItem) => {
          menuItem.active = false;
        });
      },
      hidesecondmenu() {
        if (this.layoutobject.includes("compact-sidebar"))
          this.menuItems.forEach((menuItem) => (menuItem.active = false));
        if (useWindowScroll().x < 991) {
          useMenuStore().togglesidebar = false;
        }
      },
    },
  };
</script>
