<template>
    <form><slot></slot></form>
</template>
<script>
// const prefixCls = 'gt-form';
export default {
    name:'Form',
    data(){
        return {
            fields: []
        }
    },
    props:{
        rules:{
            type:Object,
        },
        model:{
            type: Object
        }
    },
    methods:{
        validate(callback) {
            return new Promise((resolve) => {
                let valid = true;
                let count = 0;
                this.fields.forEach((field) => {
                    field.validate('', (errors) => {
                        if (errors) {
                            valid = false;
                        }
                        if (++count === this.fields.length) {
                            resolve(valid);
                            if (typeof callback === 'function') {
                                callback(valid);
                            }
                        }
                    });
                });
            });
        }
    },
    created(){
        this.$on('on-form-item-add', (field) => {
            if (field) this.fields.push(field);
            return false;
        });
    },
    watch:{
        rules(val){
            if(val){
                this.validate(val)
            }
        }
    }

    
}
</script>


