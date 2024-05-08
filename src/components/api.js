import axios from "axios";

const api = axios.create({
    baseURL: "https://nc-news-project-58d8.onrender.com/api/"
})

export function getAllArticles(paramsObj){
    return api.get("/articles", {
        params: paramsObj
    })
}

export function getArticle(article_id){
    return api.get(`/articles/${article_id}`)
}

export function getArticleComments(article_id, paramsObj){
    return api.get(`/articles/${article_id}/comments`, {
        params: paramsObj
    })
}

export function patchArticleVote(article_id, inc_votes){
    return api.patch(`/articles/${article_id}`, {"inc_votes": inc_votes})
}