import { useState } from "react";
import "./Display.css";

const Pagination = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPostsAvailable = 24;
  const postsPerPage = 6;

  const totalNumberOfPages = Math.ceil(totalPostsAvailable / postsPerPage);
  const lastPostIndex = postsPerPage * currentPage;
  const startPostIndex = lastPostIndex - postsPerPage;

  const postsToBeShown = data.slice(startPostIndex, lastPostIndex);

  let pagesNumbers = [];
  for (let i = 1; i <= totalNumberOfPages; i++) {
    pagesNumbers.push(i);
  }

  return (
    <div className="container">
      <div className="images">
        {postsToBeShown &&
          postsToBeShown.map((item, idx) => (
            <img className="img__item" key={idx} src={item} />
          ))}
      </div>
      <div className="pagination">
        {pagesNumbers &&
          pagesNumbers.map((pageNo, idx) => {
            return (
              <button
                className="page__button"
                key={idx}
                onClick={() => setCurrentPage(pageNo)}
              >
                {pageNo}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Pagination;
