import { useUserStore } from "./user";
import { useUserTypeStore } from "./user_type";
import { useCompanyStore } from "./company";
import { useBranchStore } from "./branch";
import { useRoleModuleStore } from "./role_module";
import { useMenuStore } from "./menu";
import { useCurrencyStore } from "./currency";
import{ useCategoryList } from "./category_list";
import { useLanguageStore } from "./language";
import { useDepartmentStore } from "./department";

export const useInitStore = defineStore("init", () => {
  const userStore = useUserStore();
  // const userTypeStore = useUserTypeStore();
  // const companyStore = useCompanyStore();
  // const branchStore = useBranchStore();
  // const roleModuleStore = useRoleModuleStore();
  // const menuStore = useMenuStore();
  // const currencyStore = useCurrencyStore();
  // const categoryList = useCategoryList();
  // const languageList = useLanguageStore();
  // const departmentStore = useDepartmentStore();
  async function fetchData() {
    const data = await fetch("https://efree.cheakautomate.online/gateway/api/v1/auth/profile/me", {
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
  })
  .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
  });
  
    setData(data);
  }
  function setData(data) {
    userStore.setData(data);
    // userTypeStore.setData(data["user_type"]);
    // userTypeStore.setListAll(data["user_type_all"]);
    // companyStore.setData(data["company"]);
    // branchStore.setData(data["branch"]);
    // roleModuleStore.setData(data["role_module"]);
    // currencyStore.setData(data["currency"]);
    // menuStore.setRoleModuleMenu();
    // categoryList.setData(data["category"]);
    // languageList.setData(data["language"]);
    // departmentStore.setData(data["department"]);
  }

  return {
    fetchData,
    setData,
  };
});
