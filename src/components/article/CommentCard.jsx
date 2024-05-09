import "./Article.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { UsernameContext } from "../../contexts/Username";
import { deleteComment } from "../api";

export default function CommentCard({ comment, handleViewComments }) {
  dayjs.extend(advancedFormat);
  const { username } = useContext(UsernameContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleDeleteComment() {
    setIsDeleting(true);
    deleteComment(comment.comment_id)
      .then(() => {
        setIsDeleting(false);
        setIsDeleted(true);
        handleViewComments();
      })
      .catch(() => {
        setIsError(true);
      });
  }

  function deleteBtn() {
    return (
      <button
        onClick={() => {
          handleDeleteComment();
        }}
        disabled={isError}
      >
        {isError ? <MdDelete /> : isDeleting ? "Deleting..." : <MdDelete />}
      </button>
    );
  }

  return (
    <div
      className={`comment-card ${
        isError
          ? "error"
          : isDeleting
          ? "deleting"
          : isDeleted
          ? "hidden"
          : null
      }`}
    >
      <p className="error-msg">
        {isError
          ? "Whoopsie! That didn't work. Please refresh and try again"
          : null}
      </p>
      <p>{comment.body}</p>
      <p>{comment.author}</p>
      <div> {comment.votes}</div>
      <time id="article-date">
        {dayjs(comment.created_at).format("Do MMM YYYY")}
      </time>
      {username === comment.author && deleteBtn()}
    </div>
  );
}
