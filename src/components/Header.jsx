import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsernameContext } from "../contexts/Username";
import { getUser } from "./api";

export default function Header() {
  const { username } = useContext(UsernameContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser(username).then((userData) => {
      setUser(userData.data.user);
    });
  }, []);

  return (
    <header className="header">
      <Link to={`/`}>
        <h1 className="header-title">NC News</h1>
      </Link>
        <img className="header-profile" src={user.avatar_url} />
      <nav className="header-nav">
        <Link to={`/articles`}>All Articles</Link>
      </nav>
    </header>
  );
}
