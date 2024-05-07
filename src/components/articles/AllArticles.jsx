import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import AllArticlesCard from "./AllArticlesCard";
import "./AllArticles.css";
import { useSearchParams } from "react-router-dom";

export default function AllArticles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [paramsObj, setParamsObj] = useState({});

  useEffect(() => {
    const getParamEntries = () => {
        const params = {}
        searchParams.entries().forEach(([param, value])=>{
            params[param] = value
        })
        return params
    }
    setParamsObj(getParamEntries())
    setCurrentLimit(10)
    if (getParamEntries().limit) {
      setCurrentLimit(getParamEntries().limit);
    }
    getAllArticles(getParamEntries()).then((articlesData) => {
      setCurrentPage(articlesData.data.page_count.current_page);
      setTotalPages(articlesData.data.page_count.total_pages);
      setTotalArticles(articlesData.data.total_count);
      setArticles(articlesData.data.articles);
    });
  }, [searchParams]);

  function handlePerPage(e) {
    const newLimitParam = { ...paramsObj, limit: e.target.value, p: 1 };
    setParamsObj(newLimitParam);
    setSearchParams(newLimitParam);
  }

  function handleNextPageBtn() {
    const newPageParam = { ...paramsObj, p: currentPage + 1 };
    setParamsObj(newPageParam);
    setSearchParams(newPageParam);
  }

  function handlePreviousPageBtn() {
    const newPageParam = { ...paramsObj, p: currentPage - 1 };
    setParamsObj(newPageParam);
    setSearchParams(newPageParam);
  }

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
      <section>
        <p>
          Showing Articles {1 + (Number(currentPage) - 1) * Number(currentLimit)}-
          {totalArticles > Number(currentLimit) * Number(currentPage)
            ? Number(currentLimit) *  Number(currentPage)
            : totalArticles} {" "}
            of {totalArticles}
        </p>

        <label htmlFor="limit">Articles Per Page</label>
        <select
          id="limit"
          name="limit"
          value={currentLimit}
          onChange={(e) => {
            handlePerPage(e);
          }}
        >
          <option value={"10"}>10</option>
          <option value={"20"}>20</option>
          <option value={"50"}>50</option>
        </select>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              handlePreviousPageBtn();
            }}
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              handleNextPageBtn();
            }}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
