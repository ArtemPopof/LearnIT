const API_URL = "https://server.abbysoft.org:433"

class Api {
    getRandomQuestion() {
        return fetch(API_URL + '/question/random').then(res => res.json())
    }
}

export default Api;