import { useEffect, useState } from "react";
import "./Display.css";
import Pagination from "./Pagination";

const Display = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://shibe.online/api/shibes?count=100    "
    );
    const dataJson = await response.json();
    setData(dataJson);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Pagination data={data} />
    </>
  );
};

export default Display;
