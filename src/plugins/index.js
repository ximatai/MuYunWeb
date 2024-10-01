
import request from "../utils/request"
const  install = (Vue, options) => {
    window.$request = request
    window.COMPONENT_PREFIX = 'M'
}
export default {
    install
}