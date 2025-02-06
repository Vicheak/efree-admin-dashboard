export const useLanguageStore = defineStore({
  id: "language",
  state: () => {
    return {
      langIcon: "",
      langLangauge: "",
      isActive: false,
      lists: [],
    };
  },
  getters: {
    langIcon1: (state) => {
      return state.langIcon;
    },
    langLangauge1: (state) => {
      return state.langLangauge;
    },
    getList: (state) => state.lists,
  },
  actions: {
    changeLang(payload) {
      if (process.client) {
        localStorage.setItem("currentLanguage", payload.code);
        localStorage.setItem("currentLanguageIcon", payload.icon);
    
        // Update the store state
        this.langIcon = payload.icon || "flag-icon-us";
        this.langLangauge = payload.code || "EN";
      }
    },
    change(state) {
      this.isActive = !state.isActive;
    },
    setData(data) {
      this.lists = data;
    },
  },
});
