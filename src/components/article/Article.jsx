import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle, patchArticleVote } from "../api";
import "./Article.css";
import { GoComment } from "react-icons/go";
import {
  BsHandThumbsUp,
  BsFillHandThumbsUpFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
} from "react-icons/bs";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Comments from "./Comments";

export default function Article() {
  dayjs.extend(advancedFormat);

  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [optimisticVote, setOptimisticVote] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id).then((articleData) => {
      setOptimisticVote(articleData.data.article.votes);
      setArticle(articleData.data.article);
      setIsLoading(false);
    });
  }, [isError]);

  function handleThumbsUp(e) {
    if (isLiked) {
      setOptimisticVote((currVote) => {
        return Number(currVote) - 1;
      });
      patchArticleVote(article_id, -1).catch((err) => {
        console.log(err);
        setIsError(true);
      });
      setIsLiked(false);
    } else {
      if (isDisliked) {
        setOptimisticVote((currVote) => {
          return Number(currVote) + 2;
        });
        patchArticleVote(article_id, 2).catch((err) => {
          console.log(err);
          setIsError(true);
        });
        setIsLiked(true);
        setIsDisliked(false);
      } else {
        setIsError(false)
        setOptimisticVote((currVote) => {
          return Number(currVote) + 1;
        });
        patchArticleVote(article_id, 1).catch((err) => {
          console.log(err);
          setIsError(true);
        });
        setIsLiked(true);
      }
    }
  }

  function handleThumbsDown(e) {
    if (isDisliked) {
      setOptimisticVote((currVote) => {
        return Number(currVote) + 1;
      });
      patchArticleVote(article_id, 1).catch((err) => {
        console.log(err);
        setIsError(true);
      });
      setIsDisliked(false);
    } else {
      if (isLiked) {
        setOptimisticVote((currVote) => {
          return Number(currVote) - 2;
        });
        patchArticleVote(article_id, -2).catch((err) => {
          console.log(err);
          setIsError(true);
        });
        setIsDisliked(true);
        setIsLiked(false);
      } else {
        setIsError(false)
        setOptimisticVote((currVote) => {
          return Number(currVote) - 1;
        });
        patchArticleVote(article_id, -1).catch((err) => {
          console.log(err);
          setIsError(true);
        });
        setIsDisliked(true);
      }
    }
  }

  if (isLoading) {
    return <h2>Hang tight whilst we load your page {`:)`}</h2>;
  }

  if (isError) {
    setIsLiked(false)
    setIsDisliked(false)
  }

  return (
    <>
      <article className="article">
        <h2 id="article-title">{article.title}</h2>
        <h3 id="article-topic">{article.topic}</h3>
        <p id="article-author">{article.author}</p>
        <img id="article-img" src={article.article_img_url} />
        <section id="article-body">{article.body}</section>
        <div id="article-votes-comments">
          <button
            onClick={(e) => {
              handleThumbsUp(e);
            }}
          >
            {isLiked ? <BsFillHandThumbsUpFill /> : <BsHandThumbsUp />}
          </button>
          <div>{optimisticVote}</div>
          <button
            onClick={(e) => {
              handleThumbsDown(e);
            }}
          >
            {isDisliked ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
          </button>
          <div>
            {" "}
            <GoComment /> {article.comment_count}
          </div>
          <p>{isError? "Whoops! That didn't go through. Please refresh and try again": null}</p>
        </div>
        <time id="article-date">
          {dayjs(article.created_at).format("Do MMM YYYY")}
        </time>
      </article>
      <Comments article_id={article_id} />
    </>
  );
}
