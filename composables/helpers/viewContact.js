import { permissionConst } from "~/constants/permission";
import { moduleKey } from "~/constants/moduleKey";
const viewContact = (value) => {
  if (hasPermission(permissionConst.VIEW_CONTACT, moduleKey.ACCOUNT)) {
    return value;
  } else {
    return "******";
  }
};

export default viewContact;
