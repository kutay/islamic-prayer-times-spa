import Vue from "vue";

function error() {
    Vue.$log.error(...arguments);
}

function warn() {
    Vue.$log.warn(...arguments);
}

function info() {
    Vue.$log.info(...arguments);
}

function debug() {
    Vue.$log.debug(...arguments);
}

export default {
    error,
    warn,
    info,
    debug
}