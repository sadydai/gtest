import FormItem from './../form-item/form-item.vue';

FormItem.install = function (Vue) {
    Vue.component(FormItem.name, FormItem)
  }
  
  // 默认导出组件
  export default FormItem