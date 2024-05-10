import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle, patchArticleVote } from "../api";
import "./Article.css";
import { BsChatLeftText } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { BsHandThumbsDownFill } from "react-icons/bs";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Comments from "./Comments";
import ErrorMsg from "../ErrorMsg";

export default function Article() {
  dayjs.extend(advancedFormat);

  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [optimisticVote, setOptimisticVote] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isPatchError, setIsPatchError] = useState(false);
  const [isGetError, setIsGetError] = useState(false);
  const [errorObj, setErrorObj] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((articleData) => {
        setOptimisticVote(articleData.data.article.votes);
        setArticle(articleData.data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsGetError(true);
        setErrorObj(err)
      });
  }, []);

  function handleThumbsUp(e) {
    if (isLiked) {
      setOptimisticVote((currVote) => {
        return Number(currVote) - 1;
      });
      patchArticleVote(article_id, -1)
        .then(() => {
          setIsPatchError(false);
        })
        .catch((err) => {
          setIsPatchError(true);
        });
      setIsLiked(false);
    } else {
      if (isDisliked) {
        setOptimisticVote((currVote) => {
          return Number(currVote) + 2;
        });
        patchArticleVote(article_id, 2)
          .then(() => {
            setIsPatchError(false);
          })
          .catch((err) => {
            setIsPatchError(true);
          });
        setIsLiked(true);
        setIsDisliked(false);
      } else {
        setOptimisticVote((currVote) => {
          return Number(currVote) + 1;
        });
        patchArticleVote(article_id, 1)
          .then(() => {
            setIsPatchError(false);
          })
          .catch((err) => {
            setIsPatchError(true);
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
      patchArticleVote(article_id, 1)
        .then(() => {
          setIsPatchError(false);
        })
        .catch((err) => {
          setIsPatchError(true);
        });
      setIsDisliked(false);
    } else {
      if (isLiked) {
        setOptimisticVote((currVote) => {
          return Number(currVote) - 2;
        });
        patchArticleVote(article_id, -2)
          .then(() => {
            setIsPatchError(false);
          })
          .catch((err) => {
            setIsPatchError(true);
          });
        setIsDisliked(true);
        setIsLiked(false);
      } else {
        setOptimisticVote((currVote) => {
          return Number(currVote) - 1;
        });
        patchArticleVote(article_id, -1)
          .then(() => {
            setIsPatchError(false);
          })
          .catch((err) => {
            setIsPatchError(true);
          });
        setIsDisliked(true);
      }
    }
  }

  if (isGetError) {
    return (
      <ErrorMsg errorObj={errorObj}/>
    );
  }

  if (isLoading) {
    return <h2>Hang tight whilst we load your page {`:)`}</h2>;
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
            className={isPatchError ? "error" : null}
          >
            {isLiked ? <BsFillHandThumbsUpFill /> : <BsHandThumbsUp />}
          </button>
          <div>{optimisticVote}</div>
          <button
            onClick={(e) => {
              handleThumbsDown(e);
            }}
            className={isPatchError ? "error" : null}
          >
            {isDisliked ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
          </button>
          <div>
            {" "}
            <BsChatLeftText /> {article.comment_count}
          </div>
          <p className="error-msg">
            {isPatchError
              ? "Whoops! That didn't go through. Please refresh and try again"
              : null}
          </p>
        </div>
        <time id="article-date">
          {dayjs(article.created_at).format("Do MMM YYYY")}
        </time>
      </article>
      <Comments article_id={article_id} />
    </>
  );
}
