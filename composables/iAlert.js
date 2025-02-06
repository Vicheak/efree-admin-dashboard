import { msgConst } from "~/constants/app";
class CustomerAlert {
  success(message = this.getDefaultSuccessMessage()) {
    const { $i18n } = useNuxtApp();
    useNuxtApp().$showToast({ msg: $i18n.t(message), type: "success" });
  }

  warning(message = this.getDefaultWarningMessage()) {
    const { $i18n } = useNuxtApp();
    useNuxtApp().$showToast({ msg: $i18n.t(message), type: "warning" });
  }

  error(message = this.getDefaultErrorMessage()) {
    const { $i18n } = useNuxtApp();
    useNuxtApp().$showToast({ msg: $i18n.t(message), type: "error" });
  }

  invalidInput(message = this.getDefaultInvlidaInput()) {
    const { $i18n } = useNuxtApp();
    useNuxtApp().$showToast({ msg: $i18n.t(message), type: "warning" });
  }

  copySuccess(message = this.getDefaultCopySuccess()) {
    const { $i18n } = useNuxtApp();
    useNuxtApp().$showToast({ msg: $i18n.t(message), type: "success" });
  }

  getDefaultSuccessMessage() {
    const { $i18n } = useNuxtApp();
    return $i18n.t(msgConst.action_success);
  }

  getDefaultWarningMessage() {
    const { $i18n } = useNuxtApp();
    return $i18n.t(msgConst.action_error);
  }

  getDefaultErrorMessage() {
    const { $i18n } = useNuxtApp();
    return $i18n.t(msgConst.action_error);
  }

  getDefaultInvlidaInput() {
    const { $i18n } = useNuxtApp();
    return $i18n.t(msgConst.action_invalid_input);
  }

  getDefaultCopySuccess() {
    const { $i18n } = useNuxtApp();
    return $i18n.t(msgConst.action_copy_success);
  }
}

export function iAlert() {
  return new CustomerAlert();
}
