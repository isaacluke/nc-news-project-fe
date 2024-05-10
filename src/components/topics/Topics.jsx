import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";
import './Topics.css'

export default function () {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getTopics().then((topicsData) => {
      setTopics(topicsData.data.topics);
      setIsLoading(false)
    }).catch(()=>{
        setIsError(true)
    });
  }, []);

  if (isError) {
    return <h2>Whoopsie! Something went wrong</h2>;
  }
  
  if (isLoading) {
    return <h2>Hang tight whilst we load your page {`:)`}</h2>;
  }



  return (
    <>
      {topics.map((topic) => {
        return <TopicCard topic={topic} key={topic.slug}/>
      })}
    </>
  );
}
