export const useCompanyStore = defineStore({
    id: 'company',
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