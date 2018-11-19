<template>
     <div>
        <div  @click="handleClick('back')" :class="pageNormalLeftCls">
            <svg viewBox="0 0 24 24" class="page-svg">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
        </div>
        <div  :class="{active: currentPage === 1}" @click="handleClick(1)" class="pagenation-normal">1</div>
        <div v-if="totalPageCount > 5 && currentPage - 1 >= 4"  class="dot pagenation-normal"> ... </div>
        <div v-for ="(item, index) in pageList" :key="index" @click="handleClick(item)"  :class="{active: currentPage === item}" class="pagenation-normal">{{ item }}</div>
        <div v-if="totalPageCount > 5 && totalPageCount - currentPage >= 4"  class="dot pagenation-normal">...</div>
        <div  @click="handleClick(totalPageCount)" :class="{active: currentPage === totalPageCount}" v-if="totalPageCount !== 1" class="pagenation-normal">{{ totalPageCount }}</div>
        <div @click="handleClick('forward')" :class="pageNormalRightCls">
            <svg viewBox="0 0 24 24" class="page-svg">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
        </div>
    </div>
</template>
<script>
const prefixCls = 'pagenation';
export default {
    name:'Pagination',
    data(){
        return{
            totalPageCount: this.total || 20,
            currentPage: this.current || 1,
            pageList: [],
            leftDisable: false,
            rightDisable: false
        }
    },
    props:{
        current: {
            type: Number,
        },
        total: {
            type: Number
        }
    },
    computed:{
        pageNormalLeftCls() {
            return [
                `${prefixCls}-normal`,
                { [`${prefixCls}-disable`]: this.leftDisable },
            ];
        },
        pageNormalRightCls() {
            return [
                `${prefixCls}-normal`,
                { [`${prefixCls}-disable`]: this.rightDisable },
            ];
        }
    },
    methods:{
         handleClick(e) {
            if (typeof e === 'number') {
                if (this.currentPage === e) {
                    return;
                }
                this.currentPage = e;
                this.pageList = this.calcPageList(e);
            } else {
                switch (e) {
                case 'back':
                    this.currentPage = Math.max(1, this.currentPage - 1);
                    this.pageList = this.calcPageList(this.currentPage);
                    break;
                case 'forward':
                    this.currentPage = Math.min(this.totalPageCount, this.currentPage + 1);
                    this.pageList = this.calcPageList(this.currentPage);
                    break;
                }
            }
        },
        calcPageList(current) {
            const pageList = [];
            if (this.totalPageCount > 5) {
                let left = Math.max(2, current - 2);
                let right = Math.min(current + 2, this.totalPageCount - 1);
                if (current - 1 < 2) {
                    right = 4;
                }
                if (this.totalPageCount - current < 2) {
                    left = this.totalPageCount - 3;
                }

                for (let i = left; i <= right; i++) {
                    pageList.push(i);
                }
            } else {
                for (let i = 2; i < this.totalPageCount; i++) {
                    pageList.push(i);
                }
            }
            this.iconIsDisabled();
            this.$emit('pageChange',this.currentPage);
            return pageList;
        },
        iconIsDisabled() {
            this.leftDisable = this.currentPage === 1;
            this.rightDisable = this.currentPage === this.totalPageCount;
        },
        initPagination() {
            this.pageList = this.calcPageList(this.currentPage);
        }
    },
    created(){
        this.initPagination()
    },
    watch:{
        total(val){
            if(val){
                this.totalPageCount = val;
                this.initPagination()
            }
        },
        current(val){
            if(val){
                this.currentPage = val;
            }
           
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../style/scap';
@import '../style/color';
.pagenation-normal{
        display: inline-block;
        width: $page-item-size;
        height: $page-item-size;
        line-height: $page-item-size;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        margin: 0 4px;
        &:hover{
            background-color: fade($color-base, 20%);
        }
        &.active{
            background-color: $base-blue;
            color: white;
        }
        &.dot{
            pointer-events: none;
        }
    }
    .pagenation-disable{
        pointer-events: none;
        color: fade($color-base, 30%);
    }  
    .page-svg{
        width: 24px;
        height: 24px;
        vertical-align: middle;
        display: inline-block;
        fill: currentColor;
    } 

</style>
