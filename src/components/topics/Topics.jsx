import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";
import './Topics.css'

export default function () {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsData) => {
      setTopics(topicsData.data.topics);
    });
  }, []);
  return (
    <>
      {topics.map((topic) => {
        return <TopicCard topic={topic} key={topic.slug}/>
      })}
    </>
  );
}
