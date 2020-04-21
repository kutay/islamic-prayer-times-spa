const adhan = require("adhan");

const uoifMethod = adhan.CalculationMethod.Other();
uoifMethod.fajrAngle = 12;
uoifMethod.ishaAngle = 12;

const diyanetMethod = adhan.CalculationMethod.Other();
diyanetMethod.fajrAngle = 18;
diyanetMethod.ishaAngle = 17;

const methods = {
    "MuslimWorldLeague": {
        name: "Muslim World League",
        method: adhan.CalculationMethod.MuslimWorldLeague()
    },
    "UOIF": {
        name: "Les Musulmans de France (ex-UOIF)",
        method: uoifMethod
    },
    "Diyanet": {
        name: "Diyanet İşleri Başkanlığı",
        method: diyanetMethod
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