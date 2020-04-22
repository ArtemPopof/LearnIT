const API_URL = "http://localhost:8080"

class Api {
    getRandomQuestion() {
        return fetch(API_URL + '/question/random').then(res => res.json())
    }
}

export default Api;