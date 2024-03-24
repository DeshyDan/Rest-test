import axios from 'axios'

interface FetchResponse<T> {
    message?: string,
}

const apiInstance = axios.create({
    baseURL: "",

})

class ApiClient<T> {
    constructor(private endpoint: string) {
    }

    getAll() {
        return apiInstance.get(this.endpoint).then(res => res.json())
    }

    get = {}
}