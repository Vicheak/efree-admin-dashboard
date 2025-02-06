import { appConst } from "~/constants/app";
import { useRoleModuleStore } from "~/store/role_module";

function getVoicePath(voice, path = "") {
  const roleModuleStore = useRoleModuleStore();
  if (empty(voice)) {
    return appConst.defaultVoice
  }
  else {
    if (voice.includes('base64')) {
      return voice
    } else {
      let module = roleModuleStore.current_module;
      if (!empty(path)) {
        module = path
      }

      return useRuntimeConfig().public.baseUrl + "/voices/" + module + "/" + voice
    }
  }
  
}

export default getVoicePath;
