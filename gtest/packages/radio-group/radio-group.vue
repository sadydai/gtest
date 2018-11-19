<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import { findComponentsDownward } from './../utils/assist'
export default {
    name: 'RadioGroup',
    data(){
        return {
            currentValue: this.value,
            childrens : []
        }
    },
    props:{
        value: {
            type: [String,Number],
            default: ''
        }
    },
    methods:{
         updateValue() {
            this.childrens = findComponentsDownward(this, 'Radio');
            if (this.childrens) {
                this.childrens.forEach((child) => {
                    child.currentValue = this.value === child.label;
                    child.group = true;
                });
            }
        },
        change(data) {
            this.currentValue = data.value;
            this.updateValue();
            this.$emit('on-change',data.value);
            this.$emit('input', data.value)
            // 表单验证
            // this.dispatch('FormItem', 'on-form-change', data.value);
        }
    },
    mounted(){
        this.updateValue()
    },
    watch:{
        value(val){
            if(val){
                this.currentValue = this.value;
                this.updateValue()
            }
        }
    }
}
</script>
