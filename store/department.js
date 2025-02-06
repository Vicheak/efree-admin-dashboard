import { departmentAPI } from "~/constants/api"

export const useDepartmentStore = defineStore({
    id: 'department',
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
        async reload () {
            await ifetch(departmentAPI.getLists).then((res)=>{
                this.setData(res)
            })
        }
    }
})