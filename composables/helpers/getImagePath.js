import { appConst } from "~/constants/app";
import { useRoleModuleStore } from "~/store/role_module";

function getImagePath(image, path = "") {
  const roleModuleStore = useRoleModuleStore();
  if (empty(image)) {
    return appConst.defaultImage
  }
  else {
    if (image.includes('base64')) {
      return image
    } else {
      let module = roleModuleStore.current_module;
      if (!empty(path)) {
        module = path
      }

      return useRuntimeConfig().public.baseUrl + "/images/" + module + "/" + image
    }
  }
  
}

export default getImagePath;
