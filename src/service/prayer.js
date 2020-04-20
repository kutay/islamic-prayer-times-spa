const adhan = require("adhan");

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

    return prayerTimes;
}

export default {
    getPrayerToday
}