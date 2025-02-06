import Cookies from "js-cookie";
import { useUserTypeStore } from "./user_type";
import { useInitStore } from "./init";
import { getToken, onMessage, getMessaging } from "firebase/messaging";
import { reference } from "@popperjs/core";
import { data } from "@/data/menu.json";
import { userDeviceApi } from "~/constants/api";
const reactiveData = reactive(data);
// const userTypeStore = useUserTypeStore()
export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      user: {},
      token: null,
      logged: false,
      total_pending_transaction: {
        deposit: 0,
        withdraw: 0,
      },
      notification_list: [],
      notification_request: [],
      device_id: null,
    };
  },
  getters: {
    auth: (state) => state.user,
    authLevel: (state) => {
      const user = useUserTypeStore().getListAll.find(
        (obj) => obj.id == state.user.user_type_id
      );
      if (isEmpty(user)) {
        return 0;
      } else {
        return user.level;
      }
    },
    isSuperUser: (state) => state.user.user_type_id == useUserTypeStore().E_FREE,
    isCompanyUser: (state) =>
      state.user.user_type_id == useUserTypeStore().COMPANY,
    isBranchUser: (state) =>
      state.user.user_type_id == useUserTypeStore().BRANCH,
    getNotificationList: (state) => {
      return state.notification_list;
    },
    getNotificationRequest: (state) => {
      return state.notification_request;
    },
  },
  actions: {
    async login(request) {
      await fetch(`${useRuntimeConfig().public.prod}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
      .then((response) => response.json())
      .then((data) => {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 3600;
        Cookies.set(useRuntimeConfig().public.cookie_key, data.accessToken, {
          expires: expireTime,
        });
        Cookies.set(`${useRuntimeConfig().public.cookie_key}_expire`, expireTime.toString(), {
          expires: expireTime, // Same expiration as the main cookie
        });
        setInterval(() => {
          // Usage example
          if (checkCookieExpiration()) {
            console.log('Access token is still valid.');
          } else {
            console.error('Access token has expired or does not exist.');
            this.clearToken();
          }
        },300000)

        const initStore = useInitStore();
        initStore.setData(data);
        // this.requestToken();
        useRouter().push({ path: "/" });
        })
        .catch((error) => {
          console.error(error);
      })
    },
    async requestToken() {
      try {

      } catch (e) {
        console.error(e);
      }
    },
    async updateToken($token) {
      const input = {
        fcm_token: $token,
        device_id: this.device_id,
        loading: false,
      };

      await ifetch(userDeviceApi.updateToken, input);
    },
    setData(data) {
      this.token = Cookies.get(useRuntimeConfig().public.cookie_key);
      // this.user = data.user;
      this.logged = true;
    },
    async logout() {
      this.device_id = Cookies.get("browser-id");
      await ifetch("/logout", {
        device_id: this.device_id,
      });
      this.clearToken();
    },
    clearToken() {
      this.user = {};
      this.token = null;
      this.logged = false;
      Cookies.remove(useRuntimeConfig().public.cookie_key);
      navigateTo("/auth/login");
    },
    setNotificationList(item) {
      this.notification_list = item;
    },
    setNotificationRequest(item) {
      this.notification_request = item;
    },
    setTotalPendingTransaction(item) {
      // Object.assign(this.total_pending_transaction, item);
      // reactiveData.find((obj) => {
      //   if (obj.key == "deposit") {
      //     obj.badgeValue = item.deposit;
      //   } else if (obj.key == "withdraw") {
      //     obj.badgeValue = item.withdraw;
      //   }
      // });
    },
  },
});
