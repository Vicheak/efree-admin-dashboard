export const useLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    in_progress: false,
  }),
  getters: {
    getInProgress: (state) => state.in_progress,
  },
  actions: {
    setInprogress(data) {
      // console.log({ progrress: this.in_progress, data });
      if (data !== this.in_progress) {
        this.in_progress = data;
      }
    },
  },
});
