import "./AllArticles.css";

export default function AllArticlesCard({ article }) {
  return (
    <li className="all-articles-card">
      <h2 id="all-articles-title">{article.title}</h2>
      <h3 id="all-articles-topic">{article.topic}</h3>
      <p id="all-articles-author">{article.author}</p>
      <img id="all-articles-img" src={article.article_img_url} />
      <div id="all-articles-votes-comments">
        <div>♥️ {article.votes}</div>
        <div>💬 {article.comment_count}</div>
      </div>
      <time id="all-articles-date">{article.created_at}</time>
    </li>
  );
}
