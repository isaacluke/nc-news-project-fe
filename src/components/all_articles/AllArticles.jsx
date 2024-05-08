import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import AllArticlesCard from "./AllArticlesCard";
import "./AllArticles.css";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";

export default function AllArticles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [paramsObj, setParamsObj] = useState({});

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
    }
    getAllArticles(getParamEntries()).then((articlesData) => {
      setCurrentPage(articlesData.data.page_count.current_page);
      setTotalPages(articlesData.data.page_count.total_pages);
      setTotalCount(articlesData.data.total_count);
      setArticles(articlesData.data.articles);
    });
  }, [searchParams]);

  return (
    <>
      <h1>All Articles</h1>
      <section>
        <ul>
          {articles.map((article) => {
            return (
              <AllArticlesCard article={article} key={article.article_id} />
            );
          })}
        </ul>
      </section>
      <Pagination
        paramsObj={paramsObj}
        setParamsObj={setParamsObj}
        setSearchParams={setSearchParams}
        totalCount={totalCount}
        currentLimit={currentLimit}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
