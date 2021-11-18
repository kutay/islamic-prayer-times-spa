<template>
  <div id="cities" class="container">
    <span class="box">
      <configuration-panel ref="conf-panel" />
    </span>

    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>City</th>
          <th>Fajr</th>
          <th>Sunrise</th>
          <th>Dhuhr</th>
          <th>Asr</th>
          <th>Maghrib</th>
          <th>Isha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prayerTime in prayerTimes" :key="prayerTime.city">
          <td>{{ prayerTime.city }}</td>
          <td>{{ prayerTime.fajr }}</td>
          <td>{{ prayerTime.sunrise }}</td>
          <td>{{ prayerTime.dhuhr }}</td>
          <td>{{ prayerTime.asr }}</td>
          <td>{{ prayerTime.maghrib }}</td>
          <td>{{ prayerTime.isha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// Libraries
const moment = require("moment");

// Service
//import cache from "../service/cache";
import prayerService from "../service/prayer";
import calculationMethods from "../service/calculationMethods";

// Vue Components
import ConfigurationPanel from "@/components/ConfigurationPanel.vue";

const cities = [
  {
    country: "France",
    city: "Toulouse",
    postcode: "31000",
    latitude: "43.603746",
    longitude: "1.434497",
  },
  {
    country: "France",
    city: "Ris-Orangis",
    postcode: "",
    latitude: "48.645321",
    longitude: "2.416507",
  },
  {
    latitude: "48.65752",
    longitude: "2.383052",
    city: "Grigny",
    postcode: "91350",
    population: 28958,
  },
];

function getPrayerTimeCity(city, prefs) {
  const prayerTimes = prayerService.getPrayerToday(
    city.latitude,
    city.longitude,
    calculationMethods.getMethod(prefs.calculationMethod),
    prefs.juristicMethod
  );

  return {
    city: `${city.city}`,
    fajr: moment(prayerTimes.fajr).format("HH[:]mm"),
    sunrise: moment(prayerTimes.sunrise).format("HH[:]mm"),
    dhuhr: moment(prayerTimes.dhuhr).format("HH[:]mm"),
    asr: moment(prayerTimes.asr).format("HH[:]mm"),
    maghrib: moment(prayerTimes.maghrib).format("HH[:]mm"),
    isha: moment(prayerTimes.isha).format("HH[:]mm"),
  };
}

export default {
  name: "CitiesToday",
  data: function () {
    return {};
  },
  components: { ConfigurationPanel },
  computed: {
    prayerTimes: function () {
      const prefs = this.$store.getters.preferences;
      return cities.map((city) => getPrayerTimeCity(city, prefs));
    },
  },
};
</script>