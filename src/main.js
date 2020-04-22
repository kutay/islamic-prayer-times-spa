import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'

// Configure vuex
import store from "./store";

Vue.config.productionTip = false;

// BulmaCSS for Vue

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy);

// http client

const axios = require("axios");
Vue.prototype.$http = axios;

// Logging
import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : false,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options);


// Init Vue app

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
