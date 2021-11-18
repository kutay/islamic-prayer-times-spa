<template>
    <nav class="box is-mobile" v-bind:class="{'active':is_current_prayer, 'is_past': is_past_prayer}">
        <span class="level">
            <div class="level-item has-text-centered">
                <span class="name">{{ prayer_name }}</span>
            </div>
            <div class="level-item" style="max-width: 100px;">
                <span v-if="is_next_prayer" >
                    <CountdownTimer :date="prayer_start_time"></CountdownTimer>
                </span>
                <span v-else>&nbsp;</span>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <transition name="fade" mode="out-in">
                        <span :key="formatted_prayer_start_time" class="hour">{{ formatted_prayer_start_time }}</span>
                    </transition>
                    <span v-on:click.prevent="enableAlarm" title="Enable alarm" class="is-clickable">
                        <svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path v-if="!muted" fill="currentColor"
                                d="M5.312,4.566C4.19,5.685-0.715,12.681,3.523,16.918c4.236,4.238,11.23-0.668,12.354-1.789c1.121-1.119-0.335-4.395-3.252-7.312C9.706,4.898,6.434,3.441,5.312,4.566z M14.576,14.156c-0.332,0.328-2.895-0.457-5.364-2.928C6.745,8.759,5.956,6.195,6.288,5.865c0.328-0.332,2.894,0.457,5.36,2.926C14.119,11.258,14.906,13.824,14.576,14.156zM15.434,5.982l1.904-1.906c0.391-0.391,0.391-1.023,0-1.414c-0.39-0.391-1.023-0.391-1.414,0L14.02,4.568c-0.391,0.391-0.391,1.024,0,1.414C14.41,6.372,15.043,6.372,15.434,5.982z M11.124,3.8c0.483,0.268,1.091,0.095,1.36-0.388l1.087-1.926c0.268-0.483,0.095-1.091-0.388-1.36c-0.482-0.269-1.091-0.095-1.36,0.388L10.736,2.44C10.468,2.924,10.642,3.533,11.124,3.8z M19.872,6.816c-0.267-0.483-0.877-0.657-1.36-0.388l-1.94,1.061c-0.483,0.268-0.657,0.878-0.388,1.36c0.268,0.483,0.877,0.657,1.36,0.388l1.94-1.061C19.967,7.907,20.141,7.299,19.872,6.816z"/>
                            <path v-else fill="currentColor"
                                d="M14.201,9.194c1.389,1.883,1.818,3.517,1.559,3.777c-0.26,0.258-1.893-0.17-3.778-1.559l-5.526,5.527c4.186,1.838,9.627-2.018,10.605-2.996c0.925-0.922,0.097-3.309-1.856-5.754L14.201,9.194z M8.667,7.941c-1.099-1.658-1.431-3.023-1.194-3.26c0.233-0.234,1.6,0.096,3.257,1.197l1.023-1.025C9.489,3.179,7.358,2.519,6.496,3.384C5.568,4.31,2.048,9.261,3.265,13.341L8.667,7.941z M18.521,1.478c-0.39-0.391-1.023-0.391-1.414,0L1.478,17.108c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.023,0.391,1.414,0l15.629-15.63C18.912,2.501,18.912,1.868,18.521,1.478z"/>
                        </svg>
                    </span>
                </div>
            </div> 
        </span>
        
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
        data: function () {
            return {
                muted: true
            }
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
        },
        methods: {
            enableAlarm() {
                this.muted = !this.muted;
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
