const adhan = require("adhan");

const uoifMethod = new adhan.CalculationParameters(12, 12, 0, "UOIF");
const mosqueeParisMethod = new adhan.CalculationParameters(18, 18, 0, "GMP");
const diyanetMethod = new adhan.CalculationParameters(18, 17, 0, "Diyanet");

const methods = {
    "GMP": {
        name: "Grande Mosquée de Paris",
        details: "18°/18°",
        method: mosqueeParisMethod
    },
    "UOIF": {
        name: "Les Musulmans de France (ex-UOIF)",
        details: "12°/12°",
        method: uoifMethod
    },
    "Diyanet": {
        name: "Diyanet İşleri Başkanlığı",
        details: "18°/17°",
        method: diyanetMethod
    },
    "MuslimWorldLeague": {
        name: "Muslim World League",
        method: adhan.CalculationMethod.MuslimWorldLeague()
    },
    "UmmAlQura": {
        name: "Umm al-Qura University, Makkah",
        method: adhan.CalculationMethod.UmmAlQura()
    },
    "Karachi": {
        name: "University Of Islamic Sciences, Karachi",
        method: adhan.CalculationMethod.Karachi()
    },
    "Egyptian": {
        name: "Egyptian General Authority of Survey",
        method: adhan.CalculationMethod.Egyptian()
    },
    "NorthAmerica": {
        name: "Islamic Society of North America",
        method: adhan.CalculationMethod.NorthAmerica()
    },
    "Singapore": {
        name: "Majlis Ugama Islam Singapura",
        method: adhan.CalculationMethod.Singapore()
    },
    "MoonsightingCommittee": {
        name: "Moonsighting Committee",
        method: adhan.CalculationMethod.MoonsightingCommittee()
    }
};

function getAvailableMethods() {
    return methods;
}

function getMethod(methodId) {
    return methods[methodId].method;
}

export default {
    getAvailableMethods,
    getMethod
}