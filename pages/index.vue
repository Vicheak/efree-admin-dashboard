<template>
  <div>
    <defaultDashboard />
  </div>
</template>
<script setup>
import defaultDashboard from "./dashboard/index.vue";
import { useUserStore } from "~/store/user"
import { useCategoryList } from "~/store/category_list.js";
const categoryList = useCategoryList();
onMounted(() => {
  getDataCategory();
  if (checkCookieExpiration()) {
    console.log('Access token is still valid.');
  } else {
    console.error('Access token has expired or does not exist.');
    useUserStore().clearToken();
  }
})
const getDataCategory = async () => {
  await fetch("https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories", {
    method: 'GET', // Specify the method as GET
    headers: {
        'Content-Type': 'application/json',
        Authorization: "",  
    }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    categoryList.setData(data.payload);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    categoryList.setData([]);
  })
};
</script>
