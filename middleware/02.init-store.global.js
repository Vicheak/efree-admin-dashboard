import { useInitStore } from "~/store/init";
import { useUserStore } from "~/store/user";
import Cookies from "js-cookie";
import { useRoleModuleStore } from "~/store/role_module";

let alreadyDone = false;
export default defineNuxtRouteMiddleware(async (to) => {
  const moduleKey = to.matched[0]?.meta.moduleKey;
  const roleModuleStore = useRoleModuleStore();
  if (!empty(moduleKey)) {
    roleModuleStore.setCurrentModule(moduleKey);
  }
  if (alreadyDone) {
    return null;
  }
  alreadyDone = true;

  const userStore = useUserStore();
  const initStore = useInitStore();

  const token = Cookies.get(useRuntimeConfig().public.cookie_key);
  if (nullToVoid(token) != "") {
    userStore.$patch({
      token: token,
      logged: true,
    });
    await initStore.fetchData();
  }
});
