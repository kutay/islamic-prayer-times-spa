function addDaysToJsDate(someJsDate, nbDays) {
    const result = new Date(someJsDate);
    result.setDate(result.getDate() + nbDays);
    return result;
}

export default {
    addDaysToJsDate
}