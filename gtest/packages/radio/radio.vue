<template>
    <label :class="wrapClasses">
            <span :class="radioClasses">
                <span :class="innerClasses"></span>
                <span :class="correctClasses"></span>
                <input
                    type="radio"
                    :class="inputClasses"
                    :disabled="disabled"
                    :checked="currentValue"
                    :name="groupName"
                    @change="change"
                   >
            </span>
        <slot> <span>{{ label }}</span></slot>
        <i class="move-actives"></i>
    </label>
</template>
<script>
import { findComponentUpward } from './../utils/assist';
const prefixCls = 'gt-radio';
export default {
    name:'Radio',
    data(){
        return {
            currentValue : this.value,
            parent: findComponentUpward(this, 'RadioGroup'),
            group: false,
            changeActive: false
        }
    },
    props:{
        label:{
            type: String,
            default: ''
        },
        groupName:{
            type: [String, Number]
        },
        disabled:{
            type: Boolean,
            default: false
        },
        value:{
            type: [String, Number, Boolean],
            default: false
        }
    },
    computed:{
        wrapClasses() {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-group-item`]: this.group,
                    [`${prefixCls}-wrapper-checked`]: this.currentValue,
                    [`${prefixCls}-wrapper-disabled`]: this.disabled,
                    [`${prefixCls}-change`]: this.changeActive && this.currentValue,
                },
            ]  
        },
        radioClasses() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.currentValue,
                    [`${prefixCls}-disabled`]: this.disabled,
                },
            ];
        },
        innerClasses() {
            return [
                `${prefixCls}-inner`,
            ];
        },
        correctClasses() {
            return `${prefixCls}-correct`;
        },
        inputClasses() {
            return `${prefixCls}-input`;
        }

    },
    methods:{
        change(event) {
            if (this.disabled) { return false; }
            const checked = event.target.checked;
            this.currentValue = checked;
            this.$emit('on-change',this.currentValue);
            if (this.group) {
                if (this.label !== undefined) {
                    this.parent.change({
                        value: this.label,
                        checked: this.value,
                    });
                }
            } else {
                this.$emit('on-change',this.currentValue);
            }
            if (checked) {
                this.changeActive = true;
            } else { this.changeActive = false; }
        },
        updateValue() {
            this.currentValue = this.value;
        },

    },
    mounted(){
        if (this.parents) {
            this.group = true;
        }
        if (this.group) {
            this.parents.updateValue();
        } else {
            this.updateValue();
        }
    }

}
</script>

<style lang="scss">
@import '../style/color';
@import '../style/scap';
.gt-radio{
    display: inline-block;
    white-space: nowrap;
    position: relative;
    line-height: 1;
    vertical-align: middle;
    cursor: pointer;
     margin-right: $select-padding-left;
    &-wrapper{
        vertical-align: middle;
        display: inline-block;
        position: relative;
        white-space: nowrap;
        cursor: pointer;
        margin-right: $select-padding-left;
    }
    &-change .move-actives::after{
        animation: active-data .4s ease-in;
    }
    &-inner{
        display: inline-block;
        width: $radio-width-base + 2px;
        height: $radio-width-base + 2px;
        position: relative;
        background-color: white;
        border-radius: 50%;
        border: 1px solid $input-border-base;
        transition: all .2s ease-in-out;
        box-sizing: border-box;
        &::after{
            position: absolute;
            width: $radio-width-base + 2px;
            height: $radio-width-base + 2px;
            border-radius: 50%;
            display: table;
            border-top: 0;
            border-left: 0;
            content: ' ';
            // background-color: #2461F6;
            opacity: 0;
            transition: all 0.2s ease-in-out;
            // transform: scale(0);
        }
    }
    &-correct{
        width: 10px;
        height: 10px;
        border-radius: 10px;
        position: absolute;
        opacity: 0;
        transform: scale(0);
    }
    &-input{
        position: absolute;
        top:0;
        z-index: 0;
        opacity: 0;
        cursor: pointer;
    }
     &-checked .gt-radio-inner{
         border:2px solid #2461F6;
     }
    &-checked .gt-radio-inner:after{
        opacity: 1;
        transform: scale(1.1);
        transition: all .2s ease-in-out;
    }
    &-checked .gt-radio-correct{
        display: inline-block;
        z-index: 3;
        left: 5px;
        transition: all 0.2s 0.1s ease-in-out;
        opacity: 1;
        top: 5px;
        background-color: #2461F6;
        transform: scale(1);
    }
}
.move-actives{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    top:1px;
}
.move-actives::after{
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: rgba(157,181,248,.8);
    opacity: 0
}
@keyframes active-data {
    0% {
        -webkit-transform: scale(.2);
        transform: scale(.2);
        opacity: 1
    }

    50% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        opacity: .5
    }
    to {
        -webkit-transform: scale(1.7);
        transform: scale(1.7);
        opacity: 0
    }
}
</style>
