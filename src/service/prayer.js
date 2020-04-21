const adhan = require("adhan");

import util from "./util";

function getPrayer(latitude, longitude, date, calculationMethod, juristicMethod) {
    const coordinates = new adhan.Coordinates(latitude, longitude);

    const params = calculationMethod;
    if (juristicMethod === "Shafi") {
        params.madhab = adhan.Madhab.Shafi;
    } else {
        params.madhab = adhan.Madhab.Hanafi;
    }

    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    return prayerTimes;
}

function getPrayerToday(latitude, longitude, calculationMethod, juristicMethod) {
    const date = new Date();
    const prayerTimes = getPrayer(latitude, longitude, date, calculationMethod, juristicMethod);

    // We add the next day's Fajr to correctly determine the end of current day Isha
    const nextDayDate = util.addDaysToJsDate(date, 1);
    const prayerTimesNextDay = getPrayer(latitude, longitude, nextDayDate, calculationMethod, juristicMethod);
    prayerTimes.next_fajr= prayerTimesNextDay.fajr;

    return prayerTimes;
}

export default {
    getPrayerToday
}