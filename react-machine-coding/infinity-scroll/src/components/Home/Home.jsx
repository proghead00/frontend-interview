import { useState, useEffect } from "react";
import Card from "./Card";
import "./Home.css";

function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const API_URL = `https://jsonplaceholder.typicode.com/posts?_limit=12&_page=${pageNumber}`;
      const response = await fetch(API_URL);
      if (response.ok) {
        const dataJson = await response.json();
        setData((prevData) => [...prevData, ...dataJson]);
      } else {
        throw new Error("Error fetching data!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData();
  }, [pageNumber]);

  //     let newLimit = parseInt(e.target.value);
  //     if (newLimit <= 0) {
  //       newLimit = 1;
  //     }
  //     setLimit(newLimit);
  //   };

  const infinityHandler = () => {
    /*
     window.innerHeight -> height of  the browser's viewport
     document.documentElement.scrollTop -> #pixels the document has been scrolled down
     document.documentElement.scrollHeight -> height of the entire document
    */

    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  // triggerthe infinity scroll when event is triggered
  useEffect(() => {
    window.addEventListener("scroll", infinityHandler);
    return () => window.removeEventListener("scroll", infinityHandler);
  }, []);

  return (
    <div className="home">
      {data?.length > 0 ? (
        <div className="cards">
          {data &&
            data.map((item) => {
              return <Card key={item.id} title={item.title} />;
            })}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Home;
