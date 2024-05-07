import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
        <Link to={`/`}>
      <h1>NC News</h1>
        </Link>
      <nav>
        <Link to={`/articles`}>All Articles</Link>
      </nav>
    </header>
  );
}
