<template>
    <div id="app">

        <b-navbar id="nav">
            <template slot="start">
                <b-navbar-item href="#"><router-link to="/">Today</router-link></b-navbar-item>
                <b-navbar-item href="#"><router-link to="/timetable">Month timetable</router-link></b-navbar-item>
                <b-navbar-item href="#"><router-link to="/about">About</router-link></b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <span class="clock">{{ now_hour }}</span>
                    </div>
                </b-navbar-item>
                <b-navbar-item tag="div"><adhan-player /></b-navbar-item>
            </template>
        </b-navbar>

        <hr/>

        <router-view/>
    </div>
</template>

<script>
    // Libraries
    const moment = require("moment");
    // Vue Components
    import AdhanPlayer from '@/components/AdhanPlayer.vue'

    export default {
        components: {
            AdhanPlayer
        },
        computed: {
            now_hour: function () {
                return moment(this.$store.state.now.now).format("LTS")
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 10px 10px 0px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .clock {
        padding: 0.3rem 0.6rem;
        font-size: 1.5rem;
        font-family: "Menlo", monospace;
    }
</style>
