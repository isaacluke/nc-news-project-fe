import './Topics.css'
import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
  return (
    <div className="topic-card">
      <Link to={`/articles?topic=${topic.slug}`}>
        <h2>{topic.slug}</h2> 
        <p>{topic.description}</p>
      </Link>
    </div>
  );
}
