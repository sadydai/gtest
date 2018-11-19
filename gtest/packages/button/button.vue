<template>
    <div :class="btnClass">
        {{text}}
    </div>
</template>
<script>
const prefixCls = 'gt-botton'
export default {
    name: 'Gtbutton',
    data(){
        return {
        }
    },
    props:{
        text:{
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'normal'
        },
        color: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        btnClass(){
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.type}`,
                `${prefixCls}-${this.color}`,
                { [`${prefixCls}-disabled`]: this.disabled },
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../style/color.scss';
@import '../style/scap.scss';

.gt-botton{
        display: inline-block;
        border-radius: 3px;
        font-weight: 600;
        cursor: pointer;
        margin-right: 18px;
        &-normal{
            width: 140px;
            height: 40px;
            text-align: center;
            line-height: 44px;
            transition:  all .2s ease-in;
            box-shadow: 0 2px 3px 0 rgba(44,71,146,.32), 0 -1px 1px 0 rgba(44,71,146,.1);
        }
        &-primary{
            background:linear-gradient(180deg,#648cff,#3973ff);
            color: white;
        }
        &-primary:hover{
            opacity: .9;
            box-shadow: none;
        }
        &-info{
            background: linear-gradient(-180deg,#fff 8%,#f2f2f7 97%);
        }
        &-info:hover{
            background: linear-gradient(-180deg,#f2f2f7 20%,#f2f2f7 97%);
            color: $base-blue;
            box-shadow: none
        }
        &-smail{
            width: 64px;
            height: 30px;
            font-size: 13px;
            line-height: 30px;
            text-align: center
        }
        &-disabled.gt-botton-info, .gt-botton-disabled.gt-botton-info:hover{
            cursor: not-allowed;
            background: rgba(216,221,230,.8) !important;
            color: white !important;
            box-shadow: none;
            pointer-events: none;
        }
        &-disabled.gt-botton-primary, .gt-botton-disabled.gt-botton-primary:hover{
            cursor: not-allowed;
            background: #b0c7ff !important;
            color: white !important;
            box-shadow: none;
            pointer-events: none;
        }
    }

</style>



