import { branchAPI } from "~/constants/api";
export const useBranchStore = defineStore({
    id: 'branch',
    state: () => ({
        lists: [],
        branch_id: null
    }),
    getters: {
        getList: (state) => state.lists,
    },
    actions: {
        setData(data) {
            this.lists = data
        },
        async reload() {
            const data = await ifetch(branchAPI.get_combo_list)
            this.list = data
        }
    }
})