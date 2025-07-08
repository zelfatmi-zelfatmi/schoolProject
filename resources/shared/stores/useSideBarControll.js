import {defineStore} from "pinia";
import {ref, watch} from "vue";

export const useSideBarControll = defineStore('sideBarController',()=>{
    const SIDEBAR_STORAGE_NAME = 'MiniSideBar'

    const sidebarCollapse = ref(!!localStorage.getItem(SIDEBAR_STORAGE_NAME))
    watch(sidebarCollapse, (value) => {
        value ? localStorage.setItem(SIDEBAR_STORAGE_NAME, String(value)) : localStorage.removeItem(SIDEBAR_STORAGE_NAME)
    })
    return {
        sidebarCollapse
    }
})
