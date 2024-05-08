import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getArticle } from "../api";
import "./Article.css";
import { GoComment } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";
import  dayjs  from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Comments from "./Comments";

export default function Article (){

    dayjs.extend(advancedFormat)

    const {article_id} = useParams()
    const [article, setArticle] = useState({})

    useEffect(()=>{
        getArticle(article_id)
        .then((articleData)=>{
            setArticle(articleData.data.article)
        })
    },[])

    return (<>
    
    <article className="article">
        <h2 id="article-title">{article.title}</h2>
      <h3 id="article-topic">{article.topic}</h3>
      <p id="article-author">{article.author}</p>
      <img id="article-img" src={article.article_img_url} />
      <section id="article-body">
        {article.body}
      </section>
      <div id="article-votes-comments">
        <div> <FaRegHeart /> {article.votes}</div>
        <div> <GoComment /> {article.comment_count}</div>
      </div>
      <time id="article-date">{dayjs(article.created_at).format('Do MMM YYYY')}</time>
    </article>
    <Comments article_id={article_id}/>
    </>)
}