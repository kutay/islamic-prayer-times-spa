<template>
    <nav class="box level is-mobile" v-bind:class="{'active':is_current_prayer, 'is_past': is_past_prayer}">
        <div class="is-offset-1 level-item has-text-centered">
            <span class="name">{{ prayer_name }}</span>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <span v-if="!is_current_prayer">
                    <transition name="fade" mode="out-in">
                        <span :key="formatted_prayer_start_time" class="hour">{{ formatted_prayer_start_time }}</span>
                    </transition>
                </span>

                <span v-if="is_current_prayer">
                    <CountdownTimer :date="prayer_end_time"></CountdownTimer>
                </span>
            </div>
        </div>
    </nav>
</template>

<script>
    // Libraries
    const moment = require("moment");
    // Vue Components
    import CountdownTimer from '@/components/CountdownTimer.vue'

    export default {
        name: 'PrayerTimeCard',
        props: {
            prayer_name: {type: String, required: true},
            prayer_start_time: {type: Date, required: true},
            prayer_end_time: {type: Date, required: true},
            is_next_prayer: {type: Boolean, required: true},
        },
        components: {
            CountdownTimer
        },
        computed: {
            formatted_prayer_start_time: function () {
                return moment(this.prayer_start_time).format("HH[:]mm");
            },
            now: function () {
                return this.$store.state.now.now;
            },
            time_before_prayer_start: function () {
                return moment(this.prayer_start_time).diff(moment(this.now), "minutes");
            },
            time_before_prayer_end: function () {
                if (this.time_before_prayer_start < 0) {
                    return moment(this.prayer_end_time).diff(moment(this.now), "minutes");
                }
                return undefined;
            },
            is_current_prayer: function () {
                return moment(this.now).add(0, "hour").isBetween(moment(this.prayer_start_time), moment(this.prayer_end_time));
            },
            is_past_prayer: function () {
                return moment(this.now).isAfter(moment(this.prayer_end_time));
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .active {
        /*background-color: #2ECC40;*/
        background-color: #001f3f;
        color: beige;
        font-size: x-large;
    }

    .is_past {
        color: darkgray;
    }

    SPAN.name {
        display: inline-block;
        width: 150px;
    }

    SPAN.hour {
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
        /* .slide-fade-leave-active for <2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
