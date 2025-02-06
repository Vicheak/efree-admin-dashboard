import { branchAPI, currencyApi } from "~/constants/api";
export const useCurrencyStore = defineStore({
  id: "currency",
  state: () => ({
    lists: [],
  }),
  getters: {
    getList: (state) => state.lists,
  },
  actions: {
    setData(data) {
      this.lists = data;
    },
    async reload() {
      const data = await ifetch(currencyApi.get);
      this.list = data;
    },
  },
});
