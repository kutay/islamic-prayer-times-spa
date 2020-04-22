
const axios = require("axios");

import cache from "./cache";
import logger from "../libs/logger";


// https://geo.api.gouv.fr/adresse

async function reverseGeocode(lat, lon) {
    const cacheKey = `reverse/${lat}/${lon}`;

    if (cache.exists(cacheKey)) {
        logger.info(`Getting reverse geocoding for ${lat}/${lon} from cache`);
        return cache.retrieve(cacheKey);
    }

    logger.info(`Getting reverse geocoding for ${lat}/${lon} from API`);

    const results = await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`);
    const result = results.data.features[0];

    cache.save(cacheKey, result);

    return result;
}

export default {
    reverseGeocode
}