<template>
    <span>
        {{ formatted_time_left }}
    </span>
</template>

<script>
    // Libraries
    const moment = require("moment");
    require("moment-duration-format");

    export default {
        props: {
            date: {type: Date, required: true}
        },
        computed: {
            formatted_time_left: function () {
                const now = moment(this.$store.state.now.now);
                const dur = moment.duration( moment(this.date).diff(now) );
                return dur.format("hh:mm:ss");
            }
        }
    }
</script>