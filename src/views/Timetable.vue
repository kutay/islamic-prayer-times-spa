<template>
    <div class="container">
        <span class="box">
            <configuration-panel ref="conf-panel"/>
        </span>

        <hr/>

        <h3 class="subtitle">{{ currentMonth }}</h3>

        <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Fajr</th>
                    <th>Sunrise</th>
                    <th>Dhuhr</th>
                    <th>Asr</th>
                    <th>Maghrib</th>
                    <th>Isha</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="prayerTime in prayerTimes"
                    :key="prayerTime.day"
                    v-bind:class="{'is-selected': prayerTime.day === currentDay}">
                    <td>{{ prayerTime.day }}</td>
                    <td>{{ prayerTime.fajr }}</td>
                    <td>{{ prayerTime.sunrise }}</td>
                    <td>{{ prayerTime.dhuhr }}</td>
                    <td>{{ prayerTime.asr }}</td>
                    <td>{{ prayerTime.maghrib }}</td>
                    <td>{{ prayerTime.isha }}</td>
                </tr>
            </tbody>
        </table>

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

    export default {
        name: 'Home',
        data: function () {
            return {
                selectedMonth: this.$store.state.now.now
            }
        },
        components: {
            ConfigurationPanel,
        },
        mounted: function () {
            this.$refs["conf-panel"].getPosition();
        },
        computed: {
            prayerTimes: function () {
                const prefs = this.$store.getters.preferences;
                console.log(prefs);

                return prayerService.getTimesMonth(1,
                    prefs.latitude,
                    prefs.longitude,
                    calculationMethods.getMethod(prefs.calculationMethod),
                    prefs.juristicMethod);
            },
            currentMonth: function () {
                return moment(this.$store.state.now.now).format("MMMM");
            },
            currentDay: function () {
                return moment(this.$store.state.now.now).format('YYYY-MM-DD');
            }
        }
    }
</script>

<style>
</style>