import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { runQuery, submitQuery, getAssignmentById } from "../services/api";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
import "../styles/AssignmentAttempt.css";
import LeftBar from "../components/LeftBar";

function AssignmentAttempt() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("");
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await getAssignmentById(id);
        setAssignment(res.data);
      } catch (err) {
        console.error("Error fetching assignment:", err.response || err);
        setMessage("Failed to load assignment");
      }
    };

    fetchAssignment();
  }, [id]);

  const handleRun = async () => {
    try {
      const res = await runQuery({ query, assignmentId: id });
      setResult(res.data.rows);
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error running query");
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await submitQuery({ query, assignmentId: id });
      if (res.data.isCorrect) {
        setMessage("✅ Correct Answer!");
        toast.success("✅ Correct Answer");
      } else {
        setMessage("❌ Incorrect. Try Again.");
        toast.error("❌ Incorrect Answer");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Error submitting query");
    }
  };

  if (!assignment) return <p>Loading assignment...</p>;

  return (
    <div>
      <LeftBar />
      <div className="right-bar">
        <div className="assignment-attempt-page">
          <h2 className="title">Question: {assignment.title}</h2>

          <p className="description">{assignment.description}</p>

          <Editor
            height="200px"
            defaultLanguage="sql"
            value={query}
            theme="vs-dark"
            onChange={(value) => setQuery(value)}
          />

          <div className="btn-container">
            <button className="btn" onClick={handleRun}>
              <i className="ri-play-fill"></i>
              Run
            </button>
            <button className="btn" onClick={handleSubmit}>
              <i className="ri-file-check-line"></i>
              Submit
            </button>
            <button
              className="btn"
              onClick={() => setHintVisible(!hintVisible)}
            >
              <i className="ri-book-2-fill"></i>
              {hintVisible ? "Hide Hint" : "Get Hint"}
            </button>
          </div>

          {hintVisible && assignment.hint && (
            <div className="hint">{assignment.hint}</div>
          )}

          {message && <p className="message">{message}</p>}

          {result.length > 0 && (
            <div className="table-container">
              <table className="result-table">
                <thead>
                  <tr>
                    {Object.keys(result[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentAttempt;
