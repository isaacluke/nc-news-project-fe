import { Link } from "react-router-dom";
import "./AllArticles.css";
import { GoComment } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";
import  dayjs  from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

export default function AllArticlesCard({ article }) {
  dayjs.extend(advancedFormat)
  return (
    <Link to={`/articles/${article.article_id}`}>
      <li className="all-articles-card">
        <h2 id="all-articles-title">{article.title}</h2>
        <h3 id="all-articles-topic">{article.topic}</h3>
        <p id="all-articles-author">{article.author}</p>
        <img id="all-articles-img" src={article.article_img_url} />
        <div id="all-articles-votes-comments">
          <div>
            {" "}
            <FaRegHeart />
            {article.votes}
          </div>
          <div>
            <GoComment />
            {article.comment_count}
          </div>
        </div>
        <time id="all-articles-date">{dayjs(article.created_at).format('Do MMM YYYY')}</time>
      </li>
    </Link>
  );
}
