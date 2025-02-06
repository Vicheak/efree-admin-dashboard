<template>
  <div class="header-wrapper row m-0">
    <!-- <SearchBar /> -->
    <Logo />
    <!-- <div class="col-xxl-2 col-xl-2 col-md-3 col-4" v-if="userTypeStore.lists[0].type!='branch'">
      <div class="form-group">
        <select v-model="branch_id" class="form-control" @change="changeBranch">
          <option :value="null">{{ $t("please_select_branch") }}</option>
          <option
            v-for="(item, index) in branchStore.lists"
            :key="index"
            :value="item.id"
          >
            {{ item.branch_name }}
          </option>
        </select>
      </div>
    </div> -->
    <div
      class="nav-right col-xxl-7 col-xl-6 col-md-6 col-7 pull-right right-header p-0 ms-auto"
    >
      <ul class="nav-menus">
        <li class="language-nav">
          <Language />
        </li>
        <Customizersetting />
        <Profile />
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapState } from "pinia";
  import "swiper/css";
  import Language from "./language.vue";
  import Profile from "./profile";
  import Logo from "./logo.vue";
  import { useMenuStore } from "~~/store/menu";
  import Customizersetting from "../customizer/customizersetting.vue";



  export default {
    components: {
      Language,
      Profile,
      Logo,
      Customizersetting,
    },
    data() {
      return {
        bookmark: false,
      };
    },
    computed: {
      ...mapState(useMenuStore, {
        menuItems: "searchData",
        megamenuItems: "megamenu",
        searchOpen: "searchOpen",
      }),
    },
    methods: {},
  };
</script>
<script setup>
  import { useUserStore } from "~/store/user";
  import { useUserTypeStore } from "~/store/user_type";
  import { useBranchStore } from "~/store/branch";
  const userStore = useUserStore();
  const userTypeStore = useUserTypeStore();
  const branchStore = useBranchStore();
  const branch_id=ref(userStore.user.branch_id);
  // if(userTypeStore.lists[0].type=='branch'){
  //   branchStore.branch_id=userStore.user.branch_id;
  // }else{
  //   branchStore.branch_id=null;
  // }
  // const changeBranch=()=>{
  //   branchStore.branch_id=branch_id.value;
  // }
</script>
