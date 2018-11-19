<template>
     <div :class="[prefixCls]">
       <input type="text" @click="onInputLeftClick()" :value="inputLeftText" readonly>
       <input type="text" :value="inputRightText" readonly @click="onInputRightClick()" v-if="isSingle">
       <!-- left calendar -->
       <transition name= "drop">
            <div :class="[prefixCls + '-content']" v-if="isShowLeftCalendar">
                <div :class="[prefixCls + '-toolbar']">
                    <span class="toolbar-forword" @click="getForwordMonth()">
                        <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </span>
                    <div class="toolbar-time">{{currentYear}} {{currentMonth }}</div>
                    <span class="toolbar-backword"  @click="getBackwordMonth()">
                        <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </span>
                </div>
                <div :class="[prefixCls + '-week']">
                        <div v-for="days in daysName" :key="days" :class="[prefixCls + '-label']">{{days}}</div>
                </div>
                <div :class="[prefixCls + '-month-content']">
                    <div v-for="(day, index) in calendarDays" :key="index" :class="[prefixCls + '-month']">
                            <div class="datepicker-month-day" v-if="day!== 0" @click="chooseDate(day,true)" :class="{'current': isChooseDay(day,true),'forbidden': isForbidden(day,true)}">
                                <div class="day-button"></div>
                                <span class="day-text">{{day.getDate()}}</span>
                            </div>
                            <div v-if="day == 0" :class="[prefixCls + '-month-empty']">
                                <span>{{day}}</span>
                            </div>
                        </div>
                </div>
            </div>
       </transition>
       <!-- right calendar -->
       <transition name="drop" v-if="isSingle">
           <div v-if="isShowRightCalendar" :class="[prefixCls + '-content']">
               <div :class="[prefixCls + '-toolbar']">
                    <span class="toolbar-forword" @click="getForwordMonth()">
                        <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </span>
                    <div class="toolbar-time">{{currentYear}} {{currentMonth }}</div>
                    <span class="toolbar-backword"  @click="getBackwordMonth()">
                         <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </span>
                </div>
                <div :class="[prefixCls + '-week']">
                        <div v-for="days in daysName" :key="days" :class="[prefixCls + '-label']">{{days}}</div>
                </div>
                <div :class="[prefixCls + '-month-content']">
                    <div v-for="(day, index) in calendarDays" :key="index" :class="[prefixCls + '-month']">
                            <div class="datepicker-month-day" v-if="day!== 0" @click="chooseDate(day,false)"
                                :class="{'current': isChooseDay(day,false),'forbidden': isForbidden(day,false)}">
                                <div class="day-button"></div>
                                <span class="day-text">{{day.getDate()}}</span>
                            </div>
                            <div v-if="day == 0" :class="[prefixCls + '-month-empty']">
                                <span>{{day}}</span>
                            </div>
                        </div>
                </div>
           </div>
       </transition>
    </div>
</template>
<script>
import { Calendar } from './../utils/calendar';
export default {
     name:'DatePicker',
     data(){
         return {
            prefixCls:'datepicker',
            startDate:'',
            daysName: ['六', '一', '二', '三', '四', '五', '日'],
            months : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            inputLeftText: '',
            inputRightText:  '',
            calendar: new Calendar(),
            calendarDays: [],
            currentMonth:'',
            currentYear: 0,
            currentMonthNumber: 0,
            isShowLeftCalendar:false,
            leftDateVal : this.leftVal || new Date(),
            isShowRightCalendar: false,
            rightDateVal : this.rightVal || new Date(),
            
         }
     },
     props:{
         rangeStart:{
            type: [Date, String]
         },
         rangeEnd: {
            type: [Date, String]
         },
         leftVal:{
            type: [Date, String],
            default: new Date()
         },
         rightVal:{
            type: [Date, String]
         },
         rangeMonth:{
            type: Number,
            default: 100
         },
         isSingle: {
             type: Boolean,
             default: false
         }
     },
     computed:{
         leftDate:{
             get: function(){
                  return this.leftDateVal;
             },
             set: function(val){
                this.leftDateVal = val;
                this.$emit('left-date',val);
             }
               
            },
        rightDate:{
            get: function(){
                 return this.rightDateVal;
            },
            set: function(val){
                 this.rightDateVal = val;
                this.$emit('right-date',val);
            }               
            },
    
     },
     methods:{
         onInputLeftClick() {
            this.isShowLeftCalendar = !this.isShowLeftCalendar;
            this.isShowRightCalendar = false;
            this.setLeftDate();
        },
        onInputRightClick() {
            this.isShowRightCalendar = !this.isShowRightCalendar;
            this.isShowLeftCalendar = false;
            this.setRightDate();
        },
        // 获取左侧monthday
        getCurrentValues(date) {
            this.calendarDays = [];
            this.currentMonthNumber = date.getMonth();
            this.currentMonth = this.months[this.currentMonthNumber];
            this.currentYear = date.getFullYear();
            const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
            this.calendarDays = this.calendarDays.concat.apply([], calendarArray);
        },
        getForwordMonth() {
            const currentMonth = this.currentMonthNumber;
            let newYear = this.currentYear;
            let newMonth;

            if (currentMonth === 0) {
                newYear = this.currentYear - 1;
                newMonth = 11;
            } else {
                newMonth = currentMonth - 1;
            }

            const newDate = new Date(newYear, newMonth);
            // if (!this.startDate || newDate.getTime() <= this.startDate.getTime()) {
            this.currentYear = newYear;
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            // }
        },
        getBackwordMonth() {
            const currentMonth = this.currentMonthNumber;
            let newYear = this.currentYear;
            let newMonth;

            if (currentMonth === 11) {
                newYear = this.currentYear + 1;
                newMonth = 0;
            } else {
                newMonth = currentMonth + 1;
            }
            const newDate = new Date(newYear, newMonth);
            // if (!this.startDate || newDate.getTime() >= this.startDate.getTime()) {
            this.currentYear = newYear;
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            // }
        },
        setCurrentMonth(monthNumber) {
            this.calendarDays = [];
            this.currentMonth = this.months[monthNumber];
            const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
            this.calendarDays = this.calendarDays.concat.apply([], calendarArray);
        },
        chooseDate(date, single) {
            if (single) {
                this.leftDate = date;
                this.setInputDate(date, true);
                this.isShowLeftCalendar = false;
                // this.isShowRightCalendar = true;
            } else {
                this.rightDate = date;
                this.setInputDate(date, false);
                this.isShowRightCalendar = false;
            }
        },

        // 左侧设置时间
        setInputDate(date, single) {
            let month =(date.getMonth() + 1).toString();
            if (month.length <2) {
                month = `0${month}`;
            }
            let day = (date.getDate()).toString();
            if (day.length<2) { day = `0${day}`; }
            const inputText = `${date.getFullYear()}-${month}-${day}`;
            if (single) {
                this.inputLeftText = inputText;
            } else {
                this.inputRightText = inputText;
            }
        },
        setLeftDate() {
            if (this.leftDate) {
                this.setInputDate(this.leftDate, true);
                this.getCurrentValues(this.leftDate);
            } else {
                this.inputLeftText = '';
                this.getCurrentValues(new Date());
            }
        },
        setRightDate() {
            if (this.rightDate) {
                this.setInputDate(this.rightDate, false);
                this.getCurrentValues(this.rightDate);
            } else {
                this.inputRightText = '';
                this.getCurrentValues(new Date());
            }
        },
        isCurrentDay(day) {
            if (day) {
                return day.toDateString() === new Date().toDateString();
            }
            return false;
        },
        // 是否被选中
        isChooseDay(day, single) {
            if (single) {
                if (day && this.leftDate) {
                    return day.toDateString() === this.leftDate.toDateString();
                }
            } else if (day && this.rightDate) {
                return day.toDateString() === this.rightDate.toDateString();
            }
        },
        isForbidden(date, single) {
            const NOW = new Date().getTime();
            if (single) {
                if (date) {
                    if (date.getTime() > NOW || date.getTime() > this.rightDate.getTime()
                        || date.getTime() < (NOW - (this.rangeMonth * 86400000))) {
                        return true;
                    }
                } else {
                    return false;
                }
            } else if (date) {
                if (date.getTime() > NOW || date.getTime() < this.leftDate.getTime()) {
                    return true;
                }
            } else {
                return false;
            }
        },
        handleGlobalClick(e) {
            if (this.$el) {
                if (!this.$el.contains(e.target)) {
                    this.isShowLeftCalendar = false;
                    this.isShowRightCalendar = false;
                    this.setLeftDate();
                    this.setRightDate();
                }
            }
        }

     },
     created(){
         this.startDate = new Date();
         document.addEventListener('click', this.handleGlobalClick);
         this.setLeftDate();
         this.setRightDate()
     },
     beforeDestroy(){
         document.removeEventListener('click', this.handleGlobalClick)
     }

}
</script>

<style lang="scss" scoped>

@import '../style/scap';
@import '../style/color';

.datepicker-content {
    position: absolute;
    left: 0;
    top:$input-height-base;
    display: inline-block;
    width: $datepicker-width-base;
    background-color: white;
    width: 310px;
    min-height: 300px;
    padding: 0 8px;
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 11;
    transform-origin: center top 0px;
    .datepicker-toolbar{
        height: 48px;
        line-height: 48px;
        text-align: center;
    }
    .datepicker-week{
        height: 20px;
        line-height: 20px;
        opacity: .5;
    }
    .datepicker-label{
        display: inline-block;
        width: 42px;
        text-align: center;
    }
    .datepicker-month{
        display: inline-block;
        width: 42px;
        text-align: center;
        padding: 4px 0;
        position: relative;
        line-height: 24px;
        height: 34px;
        font-size: 12px;
        box-sizing: border-box;
        margin-bottom: 2px;
        transform-origin: center top 0px;

    }
}

.datepicker{
    input{
        box-sizing: border-box;
        display: inline-block;
        max-width: 88px;
        color: $input-font-base;
        padding-left: $select-padding-left;
        border: none;
        padding: 8px 4px;
    }
    position: relative;
    &-month-content{
        padding: 8px 0;
    }
    &-month-day{
        cursor: pointer;
        .day-text{
            position: relative;
        }
    }
    &-month-empty{
        span{
            opacity: 0;
            visibility: hidden;
        }
    }
    &-month-day:hover, &-month-day.current{
        .day-button{
            transform: scale(1);
            opacity: 1;
            transition: all .45s cubic-bezier(.23,1,.32,1);
        }
        .day-text{
            color: white;
        }
    }
    &-month-day.forbidden{
        cursor:not-allowed;
        pointer-events: none;
        color:silver
    }
}
.toolbar-time{
    width: 200px;
    display: inline-block;
}
.toolbar-forword, .toolbar-backword{
    display: inline-block;
    cursor: pointer;
}

.day-button{
    width: 34px;
    border-radius: 50%;
    background-color: $base-blue;
    height: 34px;
    position: absolute;
    left: 4px;
    top:0;
    opacity: 0;
    transform: scale(0);
    transition: all .45s cubic-bezier(.23,1,.32,1);
}

</style>
