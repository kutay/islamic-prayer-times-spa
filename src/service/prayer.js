const adhan = require("adhan");
const moment = require("moment");

import util from "./util";
import logger from "../libs/logger";

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
    logger.info(`Calculating prayer times for today with parameters : ${latitude}/${longitude}/${calculationMethod.method}/${juristicMethod}`);

    const date = new Date();
    const prayerTimes = getPrayer(latitude, longitude, date, calculationMethod, juristicMethod);

    // We add the next day's Fajr to correctly determine the end of current day Isha
    const nextDayDate = util.addDaysToJsDate(date, 1);
    const prayerTimesNextDay = getPrayer(latitude, longitude, nextDayDate, calculationMethod, juristicMethod);
    prayerTimes.next_fajr = prayerTimesNextDay.fajr;

    return prayerTimes;
}

function getTimesMonth(latitude, longitude, calculationMethod, juristicMethod) {

    const timetable = [];

    const startOfMonth = moment().startOf('month');
    let indexDay = moment(startOfMonth);

    while (indexDay.get("M") === startOfMonth.get("M")) {
        const prayerTimes = getPrayer(latitude, longitude, indexDay.toDate(), calculationMethod, juristicMethod);
        timetable.push({
            day: indexDay.format('YYYY-MM-DD'),
            fajr: moment(prayerTimes.fajr).format("HH[:]mm"),
            sunrise: moment(prayerTimes.sunrise).format("HH[:]mm"),
            dhuhr: moment(prayerTimes.dhuhr).format("HH[:]mm"),
            asr: moment(prayerTimes.asr).format("HH[:]mm"),
            maghrib: moment(prayerTimes.maghrib).format("HH[:]mm"),
            isha: moment(prayerTimes.isha).format("HH[:]mm")
        });

        indexDay.add(1, "d");
    }

    return timetable;
}

export default {
    getPrayerToday,
    getTimesMonth
}