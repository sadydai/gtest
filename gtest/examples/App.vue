<template>
  <div id="app">
    <h3>button按钮</h3>
    <Gtbutton :text="'确认'"></Gtbutton>
    <Gtbutton :text="'确认'" :color="'info'"></Gtbutton>
    <h3>button small</h3>
    <Gtbutton :text="'确认'" :color="'info'" :type="'smail'"></Gtbutton>
    <Gtbutton :text="'确认'"  :type="'smail'"></Gtbutton>
    <h2>disabled button</h2>
    <Gtbutton :text="'确认'" :color="'info'" :type="'smail'" :disabled="true"></Gtbutton>
    <Gtbutton :text="'确认'"  :type="'smail'" :disabled="true"></Gtbutton>
    <Gtbutton :text="'确认'"  :disabled="true"></Gtbutton>
    <h3>input</h3>

    <Gtinput></Gtinput>
	<h3>input 验证</h3>
    <Form :rules = 'ruleValidate' ref="formValidate" :model="formValidate">
        <FormItem prop="name">
          <Gtinput v-model="formValidate.name" @on-blur= "getData()"></Gtinput>
        </FormItem>
	</Form>
    <h3>radio</h3>
    <Radio v-model="value1"></Radio>
    <h3>radiogroup</h3>
    <RadioGroup v-model="value2">
		<Radio label="确定" groupName="test"></Radio>
	   	<Radio label="取消" groupName="test"></Radio>
    </RadioGroup>
    <h3>checkbox</h3>
    <Checkbox></Checkbox>
    <h3>checkboxgroup</h3>
    <CheckboxGroup v-model="value3">
		<Checkbox label="checkbox01"></Checkbox>
        <Checkbox label="checkbox02"></Checkbox>
		<p>选取了{{value3}}</p>
    </CheckboxGroup>
	<h3>pagination</h3>
	<Pagination :total='totalPageNum' :current="currentPage" ></Pagination>
    <h3>datepick</h3>
    <DatePicker :leftVal='start' :rightVal='end' @left-date= "getDate($event)"></DatePicker>
	<h3>datepick 区间</h3>
		<DatePicker :leftVal='start' :rightVal='end' :isSingle="true"></DatePicker>
  </div>
</template>

<script>
export default {
  data () {
    return {
		test:'',
		ruleValidate: {
			name: [
				{
					type: 'string', required: true, trigger: 'change', message: '不能为空',
				},
				{ required: true, trigger: 'blur', message: '不能为空' },
			],
		},
		formValidate: {name: ''},
		value1:  false,
		value2: '',
    	value3: ['checkbox01'],
    	totalPageNum: 20,
		currentPage:1,
		start: new Date(),
		end: new Date()
    }
  },
  methods: {
	getData(){
		console.log('222')
	},
	getDate(e){
		console.log(e)
	}
  }
}
</script>

<style lang="scss">
#app{
	padding: 30px;
	background-color: #eee
}
</style>
  