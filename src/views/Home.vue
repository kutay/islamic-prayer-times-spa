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

        <div id="today" class="box">
            <PrayerTimeCard prayer_name="Fajr" :prayer_time="prayerTimes.fajr"/>
            <PrayerTimeCard prayer_name="Sunrise" :prayer_time="prayerTimes.sunrise"/>
            <PrayerTimeCard prayer_name="Dhuhr" :prayer_time="prayerTimes.dhuhr"/>
            <PrayerTimeCard prayer_name="Asr" :prayer_time="prayerTimes.asr"/>
            <PrayerTimeCard prayer_name="Maghrib" :prayer_time="prayerTimes.maghrib"/>
            <PrayerTimeCard prayer_name="Isha" :prayer_time="prayerTimes.isha"/>
        </div>


    </div>
</template>

<script>
    const adhan = require("adhan");
    import prayerService from "../service/prayer";

    function availableCalculationMethods() {
        return Object.keys(adhan.CalculationMethod).map((item) => ({
            text: item,
            value: item
        }));
    }

    import PrayerTimeCard from '@/components/PrayerTimeCard.vue'

    export default {
        name: 'Home',
        data: function () {
            return {
                errors: [],
                latitude: 48.6312,
                longitude: 2.4397,
                availableCalculationMethods: availableCalculationMethods(),
                calculationMethod: availableCalculationMethods()[0].value,
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
                    adhan.CalculationMethod[this.calculationMethod](),
                    this.juristicMethod);
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