import DatePicker from './../datepick/datepick.vue'

DatePicker.install = function(Vue){
    Vue.component(DatePicker.name, DatePicker)
}
export default DatePicker