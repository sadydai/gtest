<template>
    <div :class="WrapClass">
        <i :class="iconClass" v-if="Icon"></i>
        <input :type="type" :class="inputClass" @focus="handleFocus($event.target.value)" @blur="handleBlur($event.target.value)"
                @change="handleChange($event.target.value)" :value="currentValue" @input="handleInput($event.target.value)"
            :placeholder="placeholder" :id="inputId" :disabled="disabled">
        <label :for="inputId" v-if="label">{{label}}</label>
    </div>
</template>
<script>
const now = Date.now();
let seet = 0;
const prefixCls = 'gt-input';
export default {
    name:'Gtinput',
    data() {
        return{
            currentValue : this.value,
            inputId : `inputId_${now}_${seet++}`
        }
    },
    props:{
        value:{
            type: String,
            default: ''
        },
        placeholder:{
            type: [String, Number],
            default: ''
        },
        label:{
            type: String,
            default: ''
        },
        disabled:{
            type: Boolean,
            default: false
        },
        Icon:{
            type:String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    computed:{
        WrapClass(){
            return [
                `${prefixCls}-wrapper`,
                { [`${prefixCls}-has-label`]: !!this.label }
            ]
        },
        iconClass() {
            return `${prefixCls}-icon`;
        },
        inputClass() {
            return [
                `${prefixCls}-input`,
                { [`${prefixCls}-disabled`]: this.disabled },
            ];
        }
    },
    methods:{
        handleFocus(event){
            this.$emit('on-focus', event)
        },
        handleChange(event) {
            this.setCurrentValue(event);
            this.$emit('on-change', event)
        },
         handleBlur(event) {
            this.getFormBlur(this.currentValue);
            this.$emit('on-blur',event)
            this.dispatch('FormItem', 'on-form-blur', this.currentValue);
        },
        getFormBlur(value){this.$emit('on-blur',value)},
        getInput(event){
            this.$emit('input', event)
        },
        handleInput(event) {
            this.getInput(event);
            this.setCurrentValue(event);
            this.$emit('input', event)
        },
        setCurrentValue(value) {
            if (value === this.currentValue) return;
            this.currentValue = value;
            this.dispatch('FormItem', 'on-form-change', value);
        },
        dispatch(componentName , eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit(eventName, params);
            }
        }
    },
    watch: {
        currentValue(val) {
            if(val){
                this.setCurrentValue(val)
            }
        }
    }
}
</script>
<style lang="scss">
@import '../style/color.scss';
@import '../style/scap.scss';

.gt-input-wrapper {
    display: inline-block;
    width: $input-width-base;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    label{
        display: inline-block;
        margin-bottom: $label-base;
        font-weight: 500;
        line-height: $label-font;
        font-size: $label-font;
        position: absolute;
        left: 0;
        top: -($label-font + $label-base);
    }
}
.gt-input {
    &-icon {
        width: 40px;
        height: $input-height-base;
        font-size: 14px;
        text-align: center;
        position: absolute;
        right: 0px;
        z-index: 3;
    }
    &-input {
        display: inline-block;
        width: 100%;
        // height: $input-height-base;
        // line-height: $input-height-base;
        padding: 12px;
        border: 1px solid $input-border-base;
        background-color: white;
        position: relative;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 14px;
    }
    &-input:hover {
        border-color: $input-border-hover;
    }
    &-input:focus {
        border:2px solid $input-border-active;
        outline: 0;
        padding: 11px 12px;
    }
    &-input:focus + label{
        color: $input-border-active;
    }
    &-disabled{
        background-color: $disabled-bg;
        border: 1px solid $disbaled-border;
        cursor: not-allowed;
    }
    &-has-label{
        margin-top: $label-font + $label-base;
    }
    &-icon + &-input {
        padding-right: 40px;
    }
}
</style>

