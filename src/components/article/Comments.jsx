import "./Article.css";
import { useEffect, useState } from "react";
import { getArticleComments } from "../api";
import CommentCard from "./CommentCard";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router-dom";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [paramsObj, setParamsObj] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true)


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
    setIsLoading(true)
    getArticleComments(article_id, paramsObj).then((commentData) => {
      setComments(commentData.data.comments);
      setTotalCount(commentData.data.total_count);
      setIsLoading(false)
    });
  }



  return (
    <>
      <button
        onClick={() => {
          handleViewComments();
          setCommentsVisible((curr) => {
            return !curr;
          });
        }}
      >
        {commentsVisible ? "Hide Comments" : "View Comments"}
      </button>
      <div className={commentsVisible ? "comments-section" : "hidden"}>
      <p>{isLoading? `Hang tight whilst we load your comments :)`: null}</p>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
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
    </>
  );
}
