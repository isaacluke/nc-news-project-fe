import "./Article.css";
import { useEffect, useState } from "react";
import { getArticleComments } from "../api";
import CommentCard from "./CommentCard";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router-dom";
import CommentPost from "./CommentPost";
import ErrorMsg from "../ErrorMsg";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [paramsObj, setParamsObj] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [isError, setIsError] = useState(false)
  const [errorObj, setErrorObj] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getParamEntries = () => {
      const params = {};
      searchParams.entries().forEach(([param, value]) => {
        params[param] = value;
      });
      return params;
    };
    setParamsObj(getParamEntries());
    setCurrentLimit(10);
    if (getParamEntries().limit) {
      setCurrentLimit(getParamEntries().limit);
      handleViewComments();
    }
    if (getParamEntries().p) {
      setCurrentPage(getParamEntries().p);
      handleViewComments();
    }
  }, [searchParams]);

  function handleViewComments() {
    setIsError(false)
    setIsLoading(true);
    getArticleComments(article_id, paramsObj).then((commentData) => {
      setComments(commentData.data.comments);
      setTotalCount(commentData.data.total_count);
      setIsLoading(false);
    }).catch((err)=>{
      console.log(err)
      setIsError(true)
      setCommentsVisible(false)
      setErrorObj(err)
    });
  }

  return (
    <section className="comments">
      <button
        onClick={() => {
          setCommentsVisible((curr) => {
            return !curr;
          });
          handleViewComments();
        }}
        className={isError? "error": null}
      >
        {commentsVisible ? "Hide Comments" : "View Comments"}
      </button>
      {isError && <ErrorMsg errorObj={errorObj}/> }
      <div className={isError? "hidden": commentsVisible ? "comments-section" : "hidden"}>
        <CommentPost
          article_id={article_id}
          handleViewComments={handleViewComments}
        />
        <p>{isLoading ? `Hang tight whilst we load your comments :)` : null}</p>
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              handleViewComments={handleViewComments}
            />
          );
        })}
        <div className={commentsVisible ? "comments-pagination" : "hidden"}>
          <Pagination
            paramsObj={paramsObj}
            setParamsObj={setParamsObj}
            setSearchParams={setSearchParams}
            totalCount={totalCount}
            currentLimit={currentLimit}
            currentPage={currentPage}
            totalPages={Math.ceil(Number(totalCount) / Number(currentLimit))}
          />
        </div>
      </div>
    </section>
  );
}
