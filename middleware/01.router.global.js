import Cookies from "js-cookie";
import { useUserStore } from "~/store/user";
export default defineNuxtRouteMiddleware((to, from) => {
  console.log("router middleware");
  if (nullToVoid(Cookies.get(useRuntimeConfig().public.cookie_key)) != "") {
    if(to.path){
      if (to.path.includes("/auth/login")) {
        return navigateTo("/");
      }
    }
  } else {
    if (!to.path.includes("/auth/login")) {
      return navigateTo("/auth/login");
    }
  }
  // if (checkCookieExpiration()) {
  //   console.log('Access token is still valid.');
  // } else {
  //   console.error('Access token has expired or does not exist.');
  //   useUserStore().clearToken();
  // }
});
// import Cookies from "js-cookie";

// export default defineNuxtRouteMiddleware((to, from) => {
//   console.log("router middleware", to);

//   // Ensure `to` is defined before accessing `to.path`
//   if (!to || !to?.path) {
//     console.error("Middleware: `to` is undefined.");
//     return;
//   }

//   const runtimeConfig = useRuntimeConfig();
//   if (!runtimeConfig?.public?.cookie_key) {
//     console.error("Middleware: Runtime config is missing!");
//     return;
//   }

//   // Check if we are on the client before accessing Cookies
//   let cookieValue = null;
//   if (process.client) {
//     cookieValue = Cookies.get(runtimeConfig.public.cookie_key);
//   }

//   console.log("Middleware: Cookie Value:", cookieValue);

//   if (cookieValue && cookieValue !== "") {
//     alert(0)
//     if (to.path.includes("/auth/login")) {
//       alert(1)
//       return navigateTo("/");
//     }
//   } else {
//     alert(2)
//     if (!to.path.includes("/auth/login")) {
//       alert(3)
//       return navigateTo("/auth/login");
//     }
//   }
// });


