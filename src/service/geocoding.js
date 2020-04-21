const axios = require("axios");

// https://geo.api.gouv.fr/adresse

async function reverseGeocode(lat, lon) {
    const result = await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`);
    return result.data.features[0];
}

export default {
    reverseGeocode
}