<template>
    <div class="container">

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Latitude / Longitude</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control is-expanded">
                        <input v-model="latitude" placeholder="Latitude" class="input">
                    </p>
                </div>
                <div class="field">
                    <p class="control is-expanded">
                        <input v-model="longitude" placeholder="Longitude" class="input">
                    </p>
                </div>
                <div class="field">
                    <p class="control is-normal">
                        <button v-on:click="getPosition" class="button is-info">Get position</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Calculation method</label>
            </div>
            <div class="field-body">
                <div class="field is-normal">
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="calculationMethod">
                                <option v-for="option in availableCalculationMethods"
                                        :key="option.value" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Juristic method</label>
            </div>
            <div class="field-body">
                <div class="field is-normal">
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="juristicMethod">
                                <option value="Shafi">Shafi/Hanbali/Maliki</option>
                                <option value="Hanafi">Hanafi</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr/>

        <h3 class="subtitle">{{ currentDay }}</h3>

        <div id="today" class="box">
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

    </div>
</template>

<script>
    // Libraries
    const moment = require("moment");
    // moment.locale("fr");

    // Service
    import prayerService from "../service/prayer";
    import calculationMethods from "../service/calculationMethods";
    // Vue Components
    import PrayerTimeCard from '@/components/PrayerTimeCard.vue'

    function availableCalculationMethods() {
        const methods = calculationMethods.getAvailableMethods();
        return Object.keys(methods).map((k) => ({
            text: methods[k].name,
            value: k
        }));
    }


    export default {
        name: 'Home',
        data: function () {
            return {
                latitude: 48.6312,
                longitude: 2.4397,
                availableCalculationMethods: availableCalculationMethods(),
                calculationMethod: availableCalculationMethods()[1].value,
                juristicMethod: "Shafi" // for Shafi/Hanbali/Maliki
            }
        },
        components: {
            PrayerTimeCard
        },
        computed: {
            prayerTimes: function () {
                return prayerService.getPrayerToday(
                    this.latitude, this.longitude,
                    calculationMethods.getMethod(this.calculationMethod),
                    this.juristicMethod);
            },
            currentDay: function () {
                return moment(this.$store.state.now.now).format("LL");
            }
        },
        methods: {
            getPosition: function () {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        this.latitude = pos.coords.latitude;
                        this.longitude = pos.coords.longitude;
                    },
                    (err) => {
                        let errorMessage = "";
                        if (err.code === 1) {
                            errorMessage = "Désolé, mais il faut nous autoriser l'accès à la géolocalisation."
                        } else {
                            errorMessage = "Désolé, cela n'a pas fonctionné à cause d'une erreur inconnue."
                        }

                        this.$buefy.notification.open({
                            duration: 5000,
                            message: errorMessage,
                            position: 'is-bottom-right',
                            type: 'is-danger'
                        })
                    })
            }
        }
    }
</script>

<style>
    DIV#today {
        background-color: beige;
    }
</style>