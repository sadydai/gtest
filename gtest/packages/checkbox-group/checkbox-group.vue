<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import {findComponentsDownward } from './../utils/assist'
export default {
    name: 'CheckboxGroup',
    data(){
        return{
            currentValue: this.value,
            childrens: []
        }
    },
    props:{
        value:{
            type: Array
        }
    },
    methods:{
        updateValue() {
            this.childrens = findComponentsDownward(this, 'Checkbox');
            if (this.childrens) {
                const { value } = this;
                this.childrens.forEach((child) => {
                    child.model = value;
                    child.currentValue = value.indexOf(child.label) >= 0;
                    child.group = true;
                });
            }
        },
        change(data) {
            this.currentValue = data;
            this.updateValue();
            this.$emit('input',data);
            this.$emit('on-change',data);
            // this.dispatch('FormItem', 'on-form-change', data.value);
        }
    },
    mounted(){
        this.updateValue();
    },
    watch:{
        value(val){
            if(val){
                this.updateValue()
            }
        }
    }
}
</script>
