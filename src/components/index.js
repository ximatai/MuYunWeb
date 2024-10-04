//扫描所有组件文件
const components = import.meta.glob('./*/index.js', { eager: true })
const install = (app) => {
  if (install.installed) return
  install.installed = true
  //注册所有组件
  Object.keys(components).forEach((key) => {
    const component = components[key].default
    if (component.name) {
      app.component(`${COMPONENT_PREFIX}${component.name}`, component)
    }
  })
}
// 导出每个组件供单独引入
export const allComponents = Object.keys(components).map(
  (key) => components[key].default,
)

// 动态生成导出的对象
const exportsMap = {}
allComponents.forEach((component) => {
  if (component.name) {
    exportsMap[component.name] = component
  }
})
export default {
  install,
}
