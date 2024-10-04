import InputNumber from './src/input-number.vue'

InputNumber.install = (app) => {
  app.component(`${COMPONENT_PREFIX}${InputNumber.name}`, InputNumber)
}
export default InputNumber
