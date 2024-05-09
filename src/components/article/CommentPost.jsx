import { useContext, useState } from "react";
import { UsernameContext } from "../../contexts/Username";
import { postArticleComment } from "../api";

export default function CommentPost({article_id, handleViewComments}) {
  const { username } = useContext(UsernameContext);
  const [commentText, setCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleArticleComment(e) {
    setCommentText(e.target.value);
  }
  function handleCommentSubmit(e){
    setIsError(false)
    e.preventDefault()
    setIsPosting(true)
    postArticleComment(article_id, username, commentText)
    .then(()=>{
        setIsPosting(false)
        setIsPosted(true)
        handleViewComments()
        setTimeout(()=>{
            setIsPosted(false)
            setCommentText("")
            e.target.disabled = false
        },2000)
    })
    .catch((err)=>{
        e.target.disabled = false
        setIsError(true)
    })
    e.currentTarget.disabled=true
  }

  return (
    <div>
      <form>
        <label htmlFor="article-comment">Add a comment</label>
        <textarea
          id="article-comment"
          placeholder="Join the discussion!"
          name="article-comment"
          value={commentText}
          onChange={(e) => {
            handleArticleComment(e);
          }}

        ></textarea>
        <button
          onClick={(e) => {
            handleCommentSubmit(e);
          }}
        >
          {isError
            ? "Whoopsie!"
            : isPosting
            ? "Posting..."
            : isPosted
            ? "Posted!"
            : "Post"}
        </button>
      </form>
      <p>{isError? "That comment didn't go through :( Please refresh and try again": null}</p>
    </div>
  );
}
