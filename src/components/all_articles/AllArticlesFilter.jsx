import { useEffect, useState } from "react";

export default function AllArticlesFilter({
  paramsObj,
  setParamsObj,
  setSearchParams,
}) {

    const [sortByValue, setSortByValue] = useState("")
    const [orderValue, setOrderValue] = useState("")

    useEffect(() => {
        setSortByValue(paramsObj.sort_by || "created_at");
        setOrderValue(paramsObj.order || "desc");
      }, [paramsObj]);

  function handleSortBy(e) {
    const newSortByParam = { ...paramsObj, sort_by: e.currentTarget.value, p: 1 };
    setParamsObj(newSortByParam);
    setSearchParams(newSortByParam);
  }

  function handleOrder(e) {
    const newOrderParam = { ...paramsObj, order: e.currentTarget.value, p: 1 };
    setParamsObj(newOrderParam);
    setSearchParams(newOrderParam);
  }


  return (
    <form>
      <label htmlFor="sort">Sort By</label>
      <select id="sort" name="sort" onChange={(e)=>{handleSortBy(e)}} value={sortByValue}>
        <option value={"created_at"}>Date</option>
        <option value={"comment_count"}>Comments</option>
        <option value={"votes"}>Votes</option>
      </select>
      <label htmlFor="order">Order</label>
      <select id="order" name="order" onChange={(e)=>{handleOrder(e)}} value={orderValue}>
        <option value={"desc"}>Descending</option>
        <option value={"asc"}>Ascending</option>
      </select>
    </form>
    
  );
}
