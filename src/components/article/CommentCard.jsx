import "./Article.css";
import  dayjs  from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

export default function CommentCard({ comment }) {
    dayjs.extend(advancedFormat)
  return (
    <div className="comment-card">
      <p>{comment.body}</p>
      <p>{comment.author}</p>
        <div> {comment.votes}</div>
      <time id="article-date">{dayjs(comment.created_at).format('Do MMM YYYY')}</time>
    </div>
  );
}
