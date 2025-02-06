export const useCategoryList = defineStore({
    id: 'categoryList',
    state: () => ({
        lists: []
    }),
    getters: {
        getList: (state) => state.lists,
    },
    actions: {
        setData(data) {
            this.lists = data
        },
    }
})