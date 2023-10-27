import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";

const useFetchPromise = (
  query,
  transformData,
  promise,
  debounceTime,
  autoSuggest
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    debounce(async (query, transformData, signal) => {
      try {
        const response = await promise(query, signal);
        if (!response.ok) throw new Error(response.statusText);
        const dataJson = await response.json();
        setData(transformData(dataJson));
      } catch (err) {
        console.log(err);
        if (!signal.aborted) setError(err);
      }
    }, debounceTime),
    []
  );

  useEffect(() => {
    if (!query || !autoSuggest) {
      setData(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    // API call here
    fetchData(query, transformData, signal); // pass the arguments from here

    // abort will be done in cleanup fn
    // whenever the query changes, the cleanup fn will be run before re-rendering
    return () => {
      controller.abort();
    };
  }, [query, transformData, fetchData, debounceTime]);

  // this function will return data, setData, error msg
  return [data, setData, error];
};

export default useFetchPromise;
