export const useRoleModuleStore = defineStore({
    id: 'role_module',
    state: () => ({
        lists: [],
        current_module: null
    }),
    getters: {
        getList: (state) => state.lists,
    },
    actions: {
        setData(data) {
            this.lists = data
        },
        setCurrentModule(data) {
            this.current_module = data
        }
    }
})