class Api {
    API_URL = "https://server.abbysoft.org:433"

    getRandomQuestion() {
        return fetch(this.API_URL + '/question/random').then(res => res.json())
    }

    getURL() {
        return this.API_URL;
    }
}

export default Api;