import { useUserStore } from "~/store/user";
import { useRoleModuleStore } from "~/store/role_module";
export function hasPermission(action, module = null) {
  const userStore = useUserStore();
  const roleModuleStore = useRoleModuleStore();
  if (isEmpty(userStore.auth)) {
    return false;
  }
  let moduleKey = module;
  if (empty(module)) {
    moduleKey = roleModuleStore.current_module;
  }

  if (userStore.isSuperUser) {
    return true;
  } else {
    const module = roleModuleStore.getList.find(
      (obj) => obj?.module_key == moduleKey
    );
    if (!isEmpty(module)) {
      const hasPermission = module.permissions.find(
        (ele) => ele.permission_name == action
      );
      if (empty(hasPermission)) {
        return false;
      } else {
        return true;
      }
    }
  }
}
