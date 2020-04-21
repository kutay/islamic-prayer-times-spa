<template>
    <div class="container">

        <b-tabs v-model="activeTab" position="is-centered" size="is-medium" expanded>
            <b-tab-item label="Configuration">
                <span class="box">

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Location</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <b-autocomplete
                                            :data="results"
                                            placeholder="e.g. Paris"
                                            field="properties.name"
                                            :loading="isFetching"
                                            @typing="getAsyncData"
                                            @select="option => location = option">
                                        <template slot-scope="props">
                                            <div class="media">
                                                <div class="media-content">
                                                    {{ props.option.properties.name }} ({{ props.option.properties.postcode }})
                                                </div>
                                            </div>
                                        </template>
                                    </b-autocomplete>
                                </p>
                            </div>
                        </div>
                    </div>

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
                            <div class="field is-narrow">
                                <p class="control is-normal has-text-centered-mobile">
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
                </span>
            </b-tab-item>

            <b-tab-item label="Adhan">
               <span class="box">
                   <div class="select">
                        <select v-model="selectedAudio">
                            <option v-for="option in availableAudios"
                                    :key="option.path" :value="option">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                   <br/><br/>
                   <div>
                       <audio-player :file="selectedAudio.path"></audio-player>
                   </div>
               </span>
            </b-tab-item>
        </b-tabs>

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
    import audios from "../service/audios";
    // Vue Components
    import PrayerTimeCard from '@/components/PrayerTimeCard.vue'
    import AudioPlayer from '@/components/AudioPlayer.vue'

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
                activeTab: 0,

                latitude: 48.6312,
                longitude: 2.4397,
                availableCalculationMethods: availableCalculationMethods(),
                calculationMethod: availableCalculationMethods()[1].value,
                juristicMethod: "Shafi", // for Shafi/Hanbali/Maliki

                availableAudios: audios.getAvailableAudios(),
                selectedAudio: audios.getAvailableAudios()[0],

                results: [],
                isFetching: false,
                location: null
            }
        },
        components: {
            PrayerTimeCard,
            AudioPlayer
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
        watch: {
            // eslint-disable-next-line no-unused-vars
            location: function (newVal, oldVal) {
                if (newVal) {
                    this.latitude = newVal.geometry.coordinates[1];
                    this.longitude = newVal.geometry.coordinates[0];
                }
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
            },
            getAsyncData: function (name) {
                if (!name.length) {
                    this.results = [];
                    return;
                }
                this.isFetching = true;
                //
                this.$http.get(`https://api-adresse.data.gouv.fr/search/?q=${name}&type=municipality&autocomplete=1&limit=10`)
                    .then(({ data }) => {
                        this.results = [];
                        data.features.forEach((item) => this.results.push(item))
                    })
                    .catch((error) => {
                        this.results = [];
                        throw error;
                    })
                    .finally(() => {
                        this.isFetching = false
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