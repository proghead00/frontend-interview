import NestedComments from "./components/NestedComments";
import "./App.css";
import commentsData from "./data/comment.json";

function App() {
  return (
    <>
      <h1>Nested Comment System</h1>
      <NestedComments
        comments={commentsData}
        onSubmit={(content) => {}}
        onEdit={(content) => {}}
        onDelete={() => {}}
      />
    </>
  );
}

export default App;
