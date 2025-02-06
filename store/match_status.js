export const useMatchStatus = defineStore({
    id: "matchStatus",
    state: () => {
      return {
        lists: [],
        enums:[]
      };
    },
    getters: {
      getList: (state) => state.lists,
      getEnums: (state) => state.enums
    },
    actions: {
      setData(data) {
        this.lists = data.lists;
        this.enums = data.enums;
      },
    },
  });
  