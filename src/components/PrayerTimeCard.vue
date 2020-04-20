<template>
    <div class="box">
        <span class="name">{{ prayer_name }}</span>
        <transition name="fade" mode="out-in">
            <span :key="formattedPrayerTime" class="hour">{{ formattedPrayerTime }}</span>
        </transition>
    </div>
</template>

<script>
    const moment = require("moment");

    export default {
        name: 'PrayerTimeCard',
        props: {
            prayer_name: {type: String, required: true},
            prayer_time: {type: Date, required: true}
        },
        computed: {
            formattedPrayerTime: function () {
                return moment(this.prayer_time).format("HH[h]mm");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    SPAN.name {
        display: inline-block;
        width: 150px;
    }

    .slide-fade-enter-active {
        transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for <2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
