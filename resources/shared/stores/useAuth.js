import { defineStore } from 'pinia'
import { ref} from 'vue'
export  const useAuth = defineStore('authenticator',()=>{
    let isActiveModal = false
    const isAuthenticated = ref(false)
    const shouldReloadCartData =ref(false)
    return{
        isActiveModal,
        shouldReloadCartData,
        isAuthenticated
    }
})
