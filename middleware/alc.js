// import { useRoleModuleStore } from "~/store/role_module";
// import { useUserStore } from "~/store/user";
// export default defineNuxtRouteMiddleware((to, from, route) => {
// 	const moduleKey = to.matched[0].meta.moduleKey;
// 	const viewKey = to.matched[0].meta.viewKey;
// 	const roleModuleStore = useRoleModuleStore();
// 	const userStore = useUserStore();
// 	const view_key =
// 		viewKey == undefined || viewKey == null || viewKey == "" ? "view" : viewKey;
// 	if (userStore.isSuperUser) {
// 		return true;
// 	} else {
// 		let userAuthorized = false;
// 		roleModuleStore.getList.forEach((obj) => {
// 			if (obj?.module_key == moduleKey) {
// 				let viewPermission = obj.permissions.find(
// 					(ele) => ele.permission_name == view_key
// 				);
// 				for (var key in viewPermission) {
// 					if (obj.hasOwnProperty(key)) userAuthorized = true;
// 				}
// 			}
// 		});
// 		if (!userAuthorized) {
// 			return navigateTo("/error/403");
// 		} else {
// 			return true;
// 		}
// 	}
// });

// import Cookies from "js-cookie";

// export default defineNuxtRouteMiddleware((to, from) => {
//   console.log("router middleware", to);

//   // Ensure `to` is defined before accessing `to.path`
//   if (!to || !to?.path) {
// 	console.error("Middleware: `to` is undefined.");
// 	return;
//   }

//   const runtimeConfig = useRuntimeConfig();
//   if (!runtimeConfig?.public?.cookie_key) {
// 	console.error("Middleware: Runtime config is missing!");
// 	return;
//   }

//   // Check if we are on the client before accessing Cookies
//   let cookieValue = null;
//   if (process.client) {
// 	cookieValue = Cookies.get(runtimeConfig.public.cookie_key);
//   }

//   console.log("Middleware: Cookie Value:", cookieValue);

//   if (cookieValue && cookieValue !== "") {
// 	if (to.path.includes("/auth/login")) {
// 	  return navigateTo("/");
// 	}
//   } else {
// 	if (!to.path.includes("/auth/login")) {
// 	  return navigateTo("/auth/login");
// 	}
//   }
// });