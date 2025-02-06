export const useUserTypeStore = defineStore({
    id: 'user_type',
    state: () => ({
        type: {
            E_FREE: 1,
            COMPANY: 2,
            BRANCH: 3
        },
        lists: [],
        listAll: []
    }),
    getters: {
        getList: (state) => state.lists,
        getListAll: (state) => state.listAll,
        getName: (state) => {
            return  (userTypeId) => {
                const obj = state.lists.find(obj => obj.id == userTypeId)
                return !isEmpty(obj)? obj.type: ''
            } 
        },
        E_FREE: (state) => state.type.E_FREE,
        COMPANY: (state) => state.type.COMPANY,
        BRANCH: (state) => state.type.BRANCH,
    },
    actions: {
        setData(data) {
            this.lists = data
        },

        setListAll(data) {
            this.listAll = data
        },

    }
})