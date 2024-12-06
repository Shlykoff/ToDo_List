import React from "react";
import { TaskList } from "./pages/TaskList";

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>To-Do List</h1>
      <TaskList />
    </div>
  );
};

export default App;
