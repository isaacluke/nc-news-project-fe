export default function Pagination({
  paramsObj,
  setParamsObj,
  setSearchParams,
  totalCount,
  currentLimit,
  currentPage,
  totalPages
}) {

  function handlePerPage(e) {
    const newLimitParam = { ...paramsObj, limit: e.target.value, p: 1 };
    setParamsObj(newLimitParam);
    setSearchParams(newLimitParam);
  }

  function handleNextPageBtn() {
    const newPageParam = { ...paramsObj, p: Number(currentPage) + 1 };
    setParamsObj(newPageParam);
    setSearchParams(newPageParam);
  }

  function handlePreviousPageBtn() {
    const newPageParam = { ...paramsObj, p: Number(currentPage) - 1 };
    setParamsObj(newPageParam);
    setSearchParams(newPageParam);
  }

  return (
    <section>
      <p>
        Showing {1 + (Number(currentPage) - 1) * Number(currentLimit)}-
        {totalCount > Number(currentLimit) * Number(currentPage)
          ? Number(currentLimit) * Number(currentPage)
          : totalCount}{" "}
        of {totalCount}
      </p>

      <label htmlFor="limit"> Results Per Page</label>
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

      <div>
        <button
          disabled={Number(currentPage) === 1}
          onClick={() => {
            handlePreviousPageBtn();
          }}
        >
          Previous
        </button>
        <button
          disabled={Number(currentPage) === Number(totalPages)}
          onClick={() => {
            handleNextPageBtn();
          }}
        >
          Next
        </button>
      </div>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </section>
  );
}
