import request from '../utils/request'

/**
 * 初始化Pinia 、axios 、自定义组件名称前缀
 * @param app
 * @param options
 */
const install = (app, options) => {
  window.$request = request
  window.COMPONENT_PREFIX = 'M'
}
export default {
  install,
}
