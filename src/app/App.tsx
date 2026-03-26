import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksPage } from "../pages/tasks-page/ui/TasksPage";
//import './styles/App.css'

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
