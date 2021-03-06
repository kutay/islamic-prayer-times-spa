import Vue from 'vue'

import Vuex from 'vuex';

Vue.use(Vuex);

import VuexNow from 'vuex-now'
import logger from "./libs/logger";
import audios from "./service/audios";

/* VuexNow(interval) - inverval: time in miliseconds for autoupdating the now variable */
const now = VuexNow(1000);

function defaultState() {
    return {
        location: {
            latitude: 48.845,
            longitude: 2.3752,
            location: null
        },
        calculationMethod: "UOIF",
        juristicMethod: "Shafi",

        adhanAudio: audios.getAvailableAudios()[0]
    };
}


export default new Vuex.Store({
    state: defaultState(),
    modules: {},
    mutations: {
        updateLocation(state, payload) {
            logger.debug("mutations.updateLocation");
            state.location = payload;
        },
        updateCalculationMethod(state, payload) {
            logger.debug("mutations.updateCalculationMethod");
            state.calculationMethod = payload;
        },
        updateJuristicMethod(state, payload) {
            logger.debug("mutations.updateJuristicMethod");
            state.juristicMethod = payload;
        }
    },
    getters: {
        preferences: state => {
            return {
                latitude: state.location.latitude,
                longitude: state.location.longitude,
                calculationMethod: state.calculationMethod,
                juristicMethod: state.juristicMethod,
            };
        }
    },
    plugins: [now]
})