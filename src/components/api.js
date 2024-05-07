import axios from "axios";

const api = axios.create({
    baseURL: "https://nc-news-project-58d8.onrender.com/api/"
})

export function getAllArticles(paramsObj){
    return api.get("/articles", {
        params: paramsObj
    })
}