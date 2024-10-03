/**
 * 全局属性以及系统配置相关的store
 */
import {defineStore} from 'pinia'
import {computed, ref} from "vue";

export const useGlobal = defineStore('global', () => {
    const token = ref(null)
    const getToken = computed(() => user.value)

    function setToken(u) {
        token.value = u
    }

    return {getToken, setToken, token}
}, {
    persist: {
        key: 'token',
        paths: ['token'],
        storage: localStorage,
    },
},)