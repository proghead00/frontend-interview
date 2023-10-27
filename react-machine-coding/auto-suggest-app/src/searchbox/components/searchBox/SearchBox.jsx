import { useState } from "react";
import useFetchPromise from "./useFetchPromise";
import "./searchBox.css";

/* eslint-disable react/prop-types */
const SearchBox = ({
  id,
  name,
  label,
  placeholder,
  styles,
  autoSuggest,
  maxItems,
  debounceTime,
  listBox,
  noItemMsg,
  errMsg,
  transformData,
  promise,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const [data, setData, error] = useFetchPromise(
    query,
    transformData,
    promise,
    debounceTime,
    autoSuggest
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyUp = (e) => {
    const key = e.key;

    if (key === "Enter") {
      if (activeIndex === null) return;
      setQuery(data[activeIndex].name);
      setData(null);
      setActiveIndex(null);
      return;
    }

    if (!data || data.length === 0) return;

    if (key === "ArrowDown") {
      // first time arrow down OR last item in the ul, so need to move it to top
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    }

    if (key === "ArrowUp") {
      if (activeIndex === 0) {
        setActiveIndex(data.length - 1);
      }
    }
  };

  return (
    <>
      <label className={styles.label}>{label}</label>
      <br />
      <input
        name={name}
        className={styles.input}
        id={id}
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      ></input>

      {data && data.length > 0 && listBox(data, activeIndex)}
      {query && data && data.length === 0 && noItemMsg()}
      {error && noItemMsg()}
    </>
  );
};

export default SearchBox;
