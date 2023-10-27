import SearchBox from "./searchbox/components/searchBox/SearchBox";
import ListBox from "./searchbox/components/listbox/ListBox";
import "./App.css";

function App() {
  // data.results -> results is in the swapi; but other APIs might have different objects
  const transformData = (data) => {
    return data.results;
  };

  const dataPromise = async (query, signal) => {
    const fetchDataPromise = await fetch(
      `https://swapi.dev/api/people/?search=${query}`,
      { signal }
    );
    return fetchDataPromise;
  };

  return (
    <div className="app-container">
      <SearchBox
        id="personName"
        name="personName"
        label="Enter a name to search"
        placeholder="Start typing here..."
        styles={{
          label: "label",
          input: "input",
        }}
        autoSuggest={true}
        maxItems={5}
        debounceTime={0}
        listBox={(items, activeIndex) => (
          <ListBox items={items} activeIndex={activeIndex} />
        )} // listBox function -> callback that renders ListBox
        noItemMsg={() => <div>Could not find</div>}
        errMsg={() => <div>Something went wrong</div>}
        transformData={transformData}
        promise={dataPromise}
      />
    </div>
  );
}

export default App;
