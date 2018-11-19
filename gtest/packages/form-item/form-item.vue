<template>
    <div :class="contentClass">
        <div :class="contentStyle">
            <slot></slot>
            <transition name="fade">
                <div class="gt-form-item-error-tip">{{ validateMessage }}</div>
            </transition>
        </div>
    </div>
</template>
<script>
import AsyncValidator from 'async-validator';
const prefixCls = 'gt-form-item';
export default {
    name:'FormItem',
    data(){
        return {
            validateState:  '',
            validateMessage:  '',
            validator:{},
            validateDisabled: false,
        }
    },
    props:{
        rules:{
            type: [Object, Array],
        },
        prop:{
            type: String
        },
        validateStatus:{
            type:Boolean,
        },
    },
    computed: {
        contentStyle(){
            return [
                `${prefixCls}`,
                { [`${prefixCls}-error`]: this.validateState === 'error' },
            ];
        },
        contentClass() {
            return [
                `${prefixCls}-content`,
                { [`${prefixCls}-content-error`]: this.validateState === 'error' },
            ];
        },
        form() {
            let parent = this.$parent;
            while (parent.$options.name && parent.$options.name !== 'Form') {
                parent = parent.$parent;
            }
            return parent;
        },
        fieldValue() {
            const model = this.form.model;
            console.log(this.prop)
            if (!model || !this.prop) { return; }
            let path = this.prop;
            if (path.indexOf(':') !== -1) {
                path = path.replace(/:/, '.');
            }
            const data = this.getPropByPath(model, path).v;
            return data;
        }

    },
    methods:{
        getPropByPath(obj, paths) {
            let tempObj = obj;
            paths = paths.replace(/\[(\w+)\]/g, '.$1');
            paths = paths.replace(/^\./, '');

            const keyArr = paths.split('.');
            let i = 0;
            for (let len = keyArr.length; i < len - 1; ++i) {
                const key = keyArr[i];
                if (key in tempObj) {
                    tempObj = tempObj[key];
                } else {
                    throw new Error(' please transfer a valid prop path to form item!');
                }
            }
            return {
                o: tempObj,
                k: keyArr[i],
                v: tempObj[keyArr[i]],
            };
        },
         onFieldBlur() {
            this.validate('blur');
        },
        onFieldChange() {
            this.validate('change');
        },
        getRules() {
            let formRules = this.form.rules;
            const selfRules = this.rules;

            formRules = formRules ? formRules[this.prop] : [];
            const r = selfRules || formRules || [];
            return [].concat(r);
        },
        getFilteredRule(trigger) {
            const rules = this.getRules();
            return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
        validate(trigger, callback = function (err) {}) {
            const rules = this.getFilteredRule(trigger);
            const descriptor = {};
            descriptor[this.prop] = rules;

            const vali = new AsyncValidator(descriptor);
            const model = {};
            model[this.prop] = this.fieldValue;
            vali.validate(model, { firstFields: true }, (errors) => {
                console.log(errors)
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                callback(this.validateMessage);
            });
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
    mounted(){
        this.$on('on-form-change', this.onFieldChange);
        this.$on('on-form-blur', this.onFieldBlur);
        this.dispatch('Form', 'on-form-item-add', this);
        const rules = this.getRules();
    },
    watch:{
        errors(val){
            if(!val){return}
            this.validateMessage = val;
            this.validateState = val === '' ? '' : 'error';
        }
    }
}
</script>


<style lang="scss">
@import '../style/color.scss';
@import '../style/scap.scss';
.gt-form-item{
    position: relative;
    &-content{
        display: inline-block;
        position: relative;
        margin-bottom: 16px;
        transition: margin-bottom .2s ease;
        &-error{
            margin-bottom: 30px;
            transition: margin-bottom .2s ease;
            label{
                color: $red_error!important;
            }
        }
    }
    &-error{
        input {
            border:2px solid $red_error!important;
            background-color: $error-bg;
            padding: 11px 12px;
        }
        select{
            border:2px solid $red_error!important;
            background-color: $error-bg;
            padding: 9px 12px;
        }
    }
    &-error-tip{
        text-align: right;
        font-size: 12px;
        color: $red_error;
        position: absolute;
        right: 0;
        margin-top: 2px;
    }
}
</style>
