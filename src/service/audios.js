const BASE_URL = "https://orkhon-islamic-files.s3.eu-west-3.amazonaws.com/";

function getAvailableAudios() {
    return [
        {
            name: "Adhan Medina",
            path: BASE_URL + "Adhan+Madina.mp3"
        },
        {
            name: "Adhan Makkah",
            path: BASE_URL + "Adhan+Makkah.mp3"
        }
    ]
}

export default {
    getAvailableAudios
}