<template>
    <div class="box">
        <span class="name">{{ prayer_name }}</span>
        <span class="hour">{{ formattedPrayerTime }}</span>
    </div>
</template>

<script>
    const moment = require("moment");

    export default {
        name: 'PrayerTimeCard',
        props: {
            prayer_name: {type: String, required: true},
            prayer_time: {type: Date, required: true}
        },
        computed: {
            formattedPrayerTime: function () {
                return moment(this.prayer_time).format("HH[h]mm");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    SPAN.name {
        display: inline-block;
        width: 150px;
    }
</style>
