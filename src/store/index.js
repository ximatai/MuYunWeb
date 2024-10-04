const appStore = {}
import { useUserStore } from './user/index'
export const registerStore = () => {
  appStore.useUserStore = useUserStore()
}
export default appStore
