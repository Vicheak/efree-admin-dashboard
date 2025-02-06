import { ofetch } from "ofetch";
import swal from "sweetalert2";
import Cookies from "js-cookie";
import { useLoadingStore } from "~/store/loading";
import { useUserStore } from "~/store/user";

export function ifetch(url, data, responseType = "json",typeMethod='GET') {
  const userStore = useUserStore();
  const loadingStore = useLoadingStore();
  const fetch = ofetch.create({
    baseURL: useRuntimeConfig().public.prod,
    method: typeMethod,
    body: data,
    responseType: responseType,
    headers: {
      Accept: "application/json",
      Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",
    },
    onRequest({ request, options }) {
      if (data?.loading === false) {
        loadingStore.setInprogress(false);
      } else {
        loadingStore.setInprogress(true);
      }
    },
    onRequestError({ request, options, error }) {
      loadingStore.setInprogress(false);
    },
    onResponse() {
      if (loadingStore.getInProgress === true) {
        loadingStore.setInprogress(false);
      }
    },
    async onResponseError({ response, error }) {
      
      loadingStore.setInprogress(false);
      const status = response.status;
      if (status == 401) {
        userStore.clearToken()
        clearError({redirect: '/auth/login'})
      } else if (status == 403) {
        swal.fire({
          icon: "warning",
          title: "Insufficient Permission",
          text: "You do not currently have permission to take this action",
        });
      } else if (status == 422) {
        let li = "";
        Object.entries(response._data.errors).map((item) => {
          li += `<li class="text-danger">${item[1]}</li>`;
        });
        swal.fire({
          title: "Sign In",
          icon: "warning",
          html: `
          <ul>
            ${li}
          </ul>
  `,
        });
      } else if (status == 424) {
        const { $i18n } = useNuxtApp();
        let obj = response._data;
        let errorMsg = obj["message"];
        swal.fire({
          icon: "warning",
          title: $i18n.t(errorMsg),
          text: $i18n.t(obj["i18n_message"]),
        });
      } else if (status == 404) {
        // swal.fire({
        //   icon: "warning",
        //   title: 'Not Found',
        //   text: "The Route could not be found",
        // });
      } else if (status >= 500) {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong.",
        });
      }
    },
  });
  return fetch(url);
}
