<template>
    <span>
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
                                field="properties.label"
                                :loading="isFetching"
                                @typing="getAsyncData"
                                @select="option => location = option"
                                ref="location-autocomplete">
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
</template>

<script>

    // Service
    import calculationMethods from "../service/calculationMethods";
    import geocoding from "../service/geocoding";
    import debounce from "lodash/debounce";

    function availableCalculationMethods() {
        const methods = calculationMethods.getAvailableMethods();
        return Object.keys(methods).map((k) => ({
            text: methods[k].name,
            value: k
        }));
    }

    export default {
        name: "ConfigurationPanel",
        data: function () {
            return {
                latitude: 48.845,
                longitude: 2.3752,
                availableCalculationMethods: availableCalculationMethods(),
                calculationMethod: availableCalculationMethods()[1].value,
                juristicMethod: "Shafi", // for Shafi/Hanbali/Maliki

                results: [],
                isFetching: false,
                location: null
            }
        },
        watch: {
            calculationMethod: function (newVal, oldVal) {
                if (newVal && oldVal !== newVal) {
                    this.$store.commit("updateCalculationMethod", this.calculationMethod);
                }
            },
            juristicMethod: function (newVal, oldVal) {
                if (newVal && oldVal !== newVal) {
                    this.$store.commit("updateJuristicMethod", this.juristicMethod);
                }
            },
            location: function (newVal, oldVal) {
                if (newVal && oldVal !== newVal) {
                    this.latitude = newVal.geometry.coordinates[1];
                    this.longitude = newVal.geometry.coordinates[0];

                    this.$store.commit("updateLocation", {
                        latitude: this.latitude,
                        longitude: this.longitude,
                        location: this.location,
                    })
                }
            }
        },
        methods: {
            updateLocationReverseGeocode: function () {
                geocoding.reverseGeocode(this.latitude, this.longitude)
                    .then((feature) => {
                        this.$refs["location-autocomplete"].setSelected(feature);
                    })
            },
            getPosition: function () {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        this.latitude = pos.coords.latitude;
                        this.longitude = pos.coords.longitude;

                        this.updateLocationReverseGeocode();
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
            getAsyncData: debounce(function (name) {
                if (!name.length) {
                    this.results = [];
                    return;
                }
                this.isFetching = true;
                //
                this.$http.get(`https://api-adresse.data.gouv.fr/search/?q=${name}&type=municipality&autocomplete=1&limit=10`)
                    .then(({data}) => {
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
            }, 500)
        }
    }
</script>

<style>

</style>