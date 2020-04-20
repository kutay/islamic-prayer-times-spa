const adhan = require("adhan");

function getPrayer(latitude, longitude, date, params) {
    const coordinates = new adhan.Coordinates(latitude, longitude);
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    return prayerTimes;
}

function getPrayerToday(latitude, longitude, calculationMethod) {
    const date = new Date();
    const params = calculationMethod;

    const prayerTimes = getPrayer(latitude, longitude, date, params);

    return prayerTimes;
}

export default {
    getPrayerToday
}