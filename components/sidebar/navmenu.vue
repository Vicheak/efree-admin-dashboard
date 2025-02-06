<template>
  <div id="sidebar-menu">
    <ul
      class="sidebar-links custom-scrollbar"
      id="myDIV"
    >
      <li
        class="sidebar-list"
      >
        <router-link
          class="sidebar-link sidebar-title"
        >
          <Icon name="solar:widget-5-linear" />
          <span>
            {{ $t('Test') }}
          </span>
        </router-link>
      </li>
      <li
        class="sidebar-list"
      >
        <router-link
          to="/"
          class="sidebar-link sidebar-title"
        >
          <Icon name="solar:widget-5-linear" />
          <span>
            {{ $t('Dashboard') }}
          </span>
          <!-- <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i> -->
        </router-link>
      </li>
      <li
        v-for="(menuItem, index) in menuItems"
        :key="index"
        class="sidebar-list"
        v-show="menuItem.title != 'file'"
      >
        <router-link
          :to="localPath('/'+menuItem.title.toLowerCase())"
          class="sidebar-link sidebar-title"
        >
          <Icon :name="iconFollowKeyMenu[menuItem.key]" />
          <span>
            {{ $t(menuItem.title) }}
          </span>
          <!-- <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i> -->
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import { mapState } from "pinia";
  import { useLayoutStore } from "~~/store/layout";
  import { useMenuStore } from "~~/store/menu";
  import { layoutClasses } from "../../constants/layout";
  import { useWindowScroll } from "@vueuse/core";
  import { useWindowSize, useLocalStorage } from "@vueuse/core";
  import { useUserStore } from "~~/store/user";
  import { iconFollowKeyMenu } from "~/composables/enum/iconFollowKeyMenu";
  let localPath = useLocalePath();
  const userStore = useUserStore();
  const menuItems = ref([]);
  const getMenu = async () => {
    const data = await fetch("https://efree.cheakautomate.online/gateway/api/v1/auth/dashboard", {
      method: 'GET', // Specify the method as GET
      headers: {
          'Content-Type': 'application/json',
          Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    menuItems.value = data;
    console.log("menuItems",menuItems.value);
  })
  .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
  });
    // menuItems.value = await ifetch("auth/dashboard",{},'json','GET');
    
    
  }
  onMounted(() => {
    getMenu();
  })
</script>

<style>
.sidebar-list{
  font-size: 17px;
}
</style>
