export const useCategoryType = defineStore({
    id: "categoryType",
    state: () => {
      return {
        survey: 6,
        blog: 2,
        portfolio: 3,
        viewGallery: 4,
        process: 5,
        page: 1,
        section: 7,
        lists: [
          { name: "survey_app", id: 6 },
          { name: "blog", id: 2 },
          { name: "portfolio", id: 3 },
          { name: "view-gallery", id: 4 },
          { name: "process", id: 5 },
          { name: "page", id: 1},
          { name: "section", id: 7},
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
  