import Menu from "@/data/menu.json";
import { defineStore } from "pinia";
import { useRoleModuleStore } from "./role_module";
import { useUserStore } from "./user";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => {
    return {
      data: [],
      searchData: [],
      togglesidebar: true,
      activeoverlay: false,
      searchOpen: false,
      customizer: "",
      hideRightArrowRTL: false,
      hideLeftArrowRTL: true,
      hideRightArrow: true,
      hideLeftArrow: true,
      width: 0,
      height: 0,
      margin: 0,
      menuWidth: 0,
    };
  },
  actions: {
    opensidebar() {
      if (process.client) {
        this.togglesidebar = !this.togglesidebar;
        if (window.innerWidth < 991) {
          this.activeoverlay = true;
        } else {
          this.activeoverlay = false;
        }
      }
    },
    resizetoggle() {
      if (process.client) {
        if (window.innerWidth < 1199) {
          this.togglesidebar = false;
          // this.activeoverlay = true
        } else {
          this.togglesidebar = true;
          // this.activeoverlay = false
        }
      }
    },
    searchTerm(term) {
      let items = [];
      var searchval = term.toLowerCase();
      this.data.filter((menuItems) => {
        if (menuItems.title) {
          if (
            menuItems.title.toLowerCase().includes(searchval) &&
            menuItems.type === "link"
          ) {
            items.push(menuItems);
          }
          if (!menuItems.children) return false;
          menuItems.children.filter((subItems) => {
            if (
              subItems.title.toLowerCase().includes(searchval) &&
              subItems.type === "link"
            ) {
              subItems.icon = menuItems.icon;
              items.push(subItems);
            }
            if (!subItems.children) return false;
            subItems.children.filter((suSubItems) => {
              if (suSubItems.title.toLowerCase().includes(searchval)) {
                suSubItems.icon = menuItems.icon;
                items.push(suSubItems);
              }
            });
          });
          this.searchData = items;
        }
      });
    },

    setNavActive(item) {
      if (!item.active) {
        this.data.forEach((a) => {
          if (this.data.includes(item)) a.active = false;
          if (!a.children) return false;
          a.children.forEach((b) => {
            if (a.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
        });
      }
      item.active = !item.active;
    },
    setActiveRoute(item) {
      this.data.filter((menuItem) => {
        if (menuItem == item) menuItem.active = true;
        if (menuItem.children && menuItem.children.includes(item)) {
          item.active = true;
          menuItem.active = true;
        }
        if (menuItem.children) {
          menuItem.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              item.active = true;
              menuItem.active = true;
              submenuItems.active = true;
            }
          });
        }
      });
    },
    setRoleModuleMenu(state) {
      const roleModuleStore = useRoleModuleStore();
      const userStore = useUserStore();
      const menuItmes = Menu.data;
      this.data = Menu.data;
      // if (isEmpty(userStore.user)) {
      //   this.data = [];
      // }
      // if (userStore.isSuperUser) {
      //   this.data = Menu.data;
      // } else {
      //   let moduleMenu = roleModuleStore.getList;
      //   let menu = [];
      //   for (let obj of menuItmes) {
      //     if (empty(obj.children)) {
      //       moduleMenu.forEach((b) => {
      //         if (obj.key == b?.module_key) {
      //           let view = empty(obj.view_key) ? "view" : obj.view_key;
      //           let viewPermission = b.permissions.find(
      //             (ele) => ele.permission_name == view
      //           );
      //           if (!isEmpty(viewPermission)) {
      //             menu.push(obj);
      //           }
      //         }
      //       });
      //     } else {
      //       let subs = [];
      //       let lastSubs = [];
      //       for (let subsObj of obj.children) {
      //         if (empty(subsObj.children)) {
      //           moduleMenu.forEach((b) => {
      //             if (subsObj.key == b?.module_key) {
      //               let view = empty(subsObj.view_key)
      //                 ? "view"
      //                 : subsObj.view_key;
      //               let viewPermission = b.permissions.find(
      //                 (obj) => obj.permission_name == view
      //               );
      //               if (!isEmpty(viewPermission)) {
      //                 subs.push(subsObj);
      //               }
      //             }
      //           });
      //         } else {
      //           subsObj.children.forEach((lastSubsObj) => {
      //             moduleMenu.forEach((b) => {
      //               if (lastSubsObj.key == b?.module_key) {
      //                 let view = empty(lastSubsObj.view_key)
      //                   ? "view"
      //                   : lastSubsObj.view_key;
      //                 let viewPermission = b.permissions.find(
      //                   (obj) => obj.permission_name == view
      //                 );
      //                 if (!isEmpty(viewPermission)) {
      //                   lastSubs.push(lastSubsObj);
      //                 }
      //               }
      //             });
      //           });
      //         }
      //         if (lastSubs.length > 0) {
      //           subs.push({
      //             title: subsObj.title,
      //             icon: subsObj.icon,
      //             type: "sub",
      //             children: lastSubs,
      //           });
      //         }
      //         lastSubs = [];
      //       }
      //       if (subs.length > 0) {
      //         menu.push({
      //           title: obj.title,
      //           path: obj.path,
      //           icon: obj.icon,
      //           key: obj.key,
      //           type: "sub",
      //           children: subs,
      //         });
      //       }
      //     }
      //   }
      //   this.data = menu;
      // }
    },
  },
});
