import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignmentsPage from "./pages/AssignmentsPage";
import AssignmentAttempt from "./pages/AssignmentAttempt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AssignmentsPage />} />
        <Route path="/assignment/:id" element={<AssignmentAttempt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;