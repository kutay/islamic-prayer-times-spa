
const CACHE_DATA_KEY = "cache_data";

if (!localStorage.getItem(CACHE_DATA_KEY)){
    localStorage.setItem(CACHE_DATA_KEY, JSON.stringify({}));
}

const cacheData = JSON.parse(localStorage.getItem(CACHE_DATA_KEY));

// eslint-disable-next-line no-unused-vars
function sync() {
    localStorage.setItem(CACHE_DATA_KEY, JSON.stringify(cacheData))
}

function getAll() {
    return localStorage.getItem(CACHE_DATA_KEY);
}

function exists(key) {
    return !!cacheData[key];
}

function retrieve(key) {
    return cacheData[key];
}

function save(key, value) {
    cacheData[key] = value;
    sync();
}

export default {
    getAll,
    exists,
    retrieve,
    save
}