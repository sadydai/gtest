import Form from './../form/form.vue';

Form.install = function (Vue) {
    Vue.component(Form.name, Form)
  }
  
  // 默认导出组件
  export default Form