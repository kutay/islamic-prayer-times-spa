const adhan = require("adhan");

function getPrayer(longitude, latitude, date, params) {
    const coordinates = new adhan.Coordinates(longitude, latitude);
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    return prayerTimes;
}

function getPrayerToday(longitude, latitude, calculationMethod) {
    const date = new Date();
    const params = calculationMethod;

    const prayerTimes = getPrayer(longitude, latitude, date, params);

    return prayerTimes;
}

export default {
    getPrayerToday
}