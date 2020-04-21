const axios = require("axios");

import cache from "./cache";

// https://geo.api.gouv.fr/adresse

async function reverseGeocode(lat, lon) {
    const cacheKey = `reverse/${lat}/${lon}`;

    if (cache.exists(cacheKey)) {
        return cache.retrieve(cacheKey);
    }

    const results = await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`);
    const result = results.data.features[0];

    cache.save(cacheKey, result);

    return result;
}

export default {
    reverseGeocode
}