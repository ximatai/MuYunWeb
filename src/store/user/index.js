import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref(null)
    const getUser = computed(() => user.value)

    function setUser(u) {
      user.value = u
    }

    return { setUser, getUser, user }
  },
  {
    persist: true,
  },
)
