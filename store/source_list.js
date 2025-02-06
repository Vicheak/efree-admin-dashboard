export const useSourceList = defineStore({
  id: "sourceList",
  state: () => {
    return {
      lists: [
        { name: "Youtube", id: 1 },
        { name: "Facebook", id: 2 },
      ],
    };
  },
  getters: {
    getList: (state) => state.lists,
  },
  actions: {
    setData(data) {
      this.lists = data;
    },
  },
});
