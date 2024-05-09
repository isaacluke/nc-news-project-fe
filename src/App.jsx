import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import AllArticles from "./components/all_articles/AllArticles";
import Article from "./components/article/Article";
import { UsernameProvider } from "./contexts/Username";

function App() {

  return (
    <UsernameProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </UsernameProvider>
  );
}

export default App;
