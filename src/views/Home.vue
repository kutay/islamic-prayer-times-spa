<template>
    <div class="container">

        <b-collapse
                        class="card"
                        animation="slide"
                        aria-id="contentIdForA11y3">
            <template #trigger="props">
                <div
                        class="card-header"
                        role="button"
                        aria-controls="contentIdForA11y3">
                    <p class="card-header-title">
                        Configuration (click to expand)
                    </p>
                    <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                    </a>
                </div>
            </template>

            <div class="card-content">
                <div class="content">
                    <configuration-panel ref="conf-panel"/>
                </div>
            </div>
        </b-collapse>

        <hr/>

        <h3 class="subtitle">{{ currentDay }}</h3>

        <div id="today" class="box" v-if="prayerTimes">
            <PrayerTimeCard prayer_name="Fajr"
                            :prayer_start_time="prayerTimes.fajr"
                            :prayer_end_time="prayerTimes.sunrise"
                            :is_next_prayer="prayerTimes.nextPrayer()==='fajr'"/>
            <PrayerTimeCard prayer_name="Sunrise"
                            :prayer_start_time="prayerTimes.sunrise"
                            :prayer_end_time="prayerTimes.sunrise"
                            :is_next_prayer="false"/>
            <PrayerTimeCard prayer_name="Dhuhr"
                            :prayer_start_time="prayerTimes.dhuhr"
                            :prayer_end_time="prayerTimes.asr"
                            :is_next_prayer="prayerTimes.nextPrayer()==='dhuhr'"/>
            <PrayerTimeCard prayer_name="Asr"
                            :prayer_start_time="prayerTimes.asr"
                            :prayer_end_time="prayerTimes.maghrib"
                            :is_next_prayer="prayerTimes.nextPrayer()==='asr'"/>
            <PrayerTimeCard prayer_name="Maghrib"
                            :prayer_start_time="prayerTimes.maghrib"
                            :prayer_end_time="prayerTimes.isha"
                            :is_next_prayer="prayerTimes.nextPrayer()==='maghrib'"/>
            <PrayerTimeCard prayer_name="Isha"
                            :prayer_start_time="prayerTimes.isha"
                            :prayer_end_time="prayerTimes.next_fajr"
                            :is_next_prayer="prayerTimes.nextPrayer()==='isha'"/>


        </div>

        <br/>
        <br/>
    </div>
</template>

<script>
    // Libraries
    const moment = require("moment");

    // Service
    import prayerService from "../service/prayer";
    import calculationMethods from "../service/calculationMethods";

    // Vue Components
    import ConfigurationPanel from '@/components/ConfigurationPanel.vue'
    import PrayerTimeCard from '@/components/PrayerTimeCard.vue'


    export default {
        name: 'Home',
        data: function () {
            return {}
        },
        components: {
            ConfigurationPanel,
            PrayerTimeCard
        },
        mounted: function () {
            this.$refs["conf-panel"].getPosition();
        },
        computed: {
            prayerTimes: function () {
                const prefs = this.$store.getters.preferences;
                return prayerService.getPrayerToday(
                    prefs.latitude, prefs.longitude,
                    calculationMethods.getMethod(prefs.calculationMethod),
                    prefs.juristicMethod);
            },
            currentDay: function () {
                return moment(this.$store.state.now.now).format("LL");
            }
        }
    }
</script>

<style>
    DIV#today {
        background-color: darkseagreen;
    }
</style>