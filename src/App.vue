<template>
    <div id="app">

        <b-navbar id="nav">
            <template slot="start">
                <b-navbar-item href="#">
                    <router-link to="/">Home</router-link>
                </b-navbar-item>
                <b-navbar-item href="#">
                    <router-link to="/about">About</router-link>
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <digital-clock :blink="false" :displaySeconds="true"/>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>

        <hr/>

        <router-view/>
    </div>
</template>

<script>
    import DigitalClock from "vue-digital-clock";

    export default {
        components: {
            DigitalClock
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
        /*background-color: #263238;*/
        /*color: #eceff1;*/
        padding: 0.3rem 0.6rem;
        font-size: 2rem;
        font-family: "Menlo", monospace;
    }
</style>
