import Vue from 'vue'

import Vuex from 'vuex';
Vue.use(Vuex);

import VuexNow from 'vuex-now'

/* VuexNow(interval) - inverval: time in miliseconds for autoupdating the now variable */
const now = VuexNow(1000);

export default new Vuex.Store({
    modules: {},
    mutations: {},
    getters: {},
    plugins: [now]
})