
export const useServiceStore = defineStore({
    id: 'service',
    state: () => ({
        isService: true,
        parent_id: null,
        array_length: 0
    }),
    getters: {
        getIsService: (state) => state.isService,
    },
    actions: {
        setData(data) {
            this.isService = data
        },
    }
})