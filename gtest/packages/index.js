import Gtbutton from './button'
import Gtinput from './input'
import FormItem from './form-item'
import Form from './form'
import Radio from './radio'
import RadioGroup from './radio-group'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Pagination from './pagination'
import DatePicker from './datepick'
import './style/normal.scss'
// 存储组件列表
const components = [
  Gtbutton,
  Gtinput,
  FormItem,
  Form,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Pagination,
  DatePicker
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否可以安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
 
}

export {
  install,
  
}