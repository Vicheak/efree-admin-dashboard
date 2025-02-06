import { appConst } from "~/constants/app";
import { useRoleModuleStore } from "~/store/role_module";

function getVideoPath(video, path = "") {
  const roleModuleStore = useRoleModuleStore();
  if (empty(video)) {
    return appConst.defaultVideo
  }
  else {
    if (video.includes('base64')) {
      return video
    } else {
      let module = roleModuleStore.current_module;
      if (!empty(path)) {
        module = path
      }

      return useRuntimeConfig().public.baseUrl + "/videos/" + module + "/" + video
    }
  }
  
}

export default getVideoPath;
