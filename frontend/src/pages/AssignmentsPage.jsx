import { useEffect, useState } from "react";
import { getAssignments } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import LeftBar from "../components/LeftBar";
import image from "../assets/question-image.webp"

function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

const fetchAssignments = async (level) => {
  try {
    const response = await getAssignments(level);
    setAssignments(response.data); 
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="assignment-page">
      <LeftBar/>
      <div className="right-bar">
        <h1 className="headline1">Sharpen Your SQL Skills</h1>
        <h2 className="headline">
          Master Database Queries With Hands On real-world scenarios.
        </h2>
        <div className="filter">
          <p
            className={`difficulty ${selectedDifficulty === "all" ? "active-all" : ""}`}
           onClick={(e)=> {fetchAssignments("")
           setSelectedDifficulty("all")}} 
          >All Levels</p>
          <p
            className={`difficulty ${selectedDifficulty === "easy" ? "active-easy" : ""}`}
           onClick={(e)=> {fetchAssignments("easy")
           setSelectedDifficulty("easy")}} 
          
          >Easy</p>
          <p
            className={`difficulty ${selectedDifficulty === "medium" ? "active-medium" : ""}`}
           onClick={(e)=> {fetchAssignments("medium")
           setSelectedDifficulty("medium")}} 

          >Medium</p>
          <p
            className={`difficulty ${selectedDifficulty === "hard" ? "active-hard" : ""}`}
           onClick={(e)=> {fetchAssignments("hard")
           setSelectedDifficulty("hard")}} 

          >Hard</p>
        </div>

        <div>
          <div className="card-container">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="card"
                onClick={() => navigate(`/assignment/${assignment.id}`)}
              >
                <img
                  className="image"
                  src={image}
                  alt="image"
                />
                <div className="inner-div">
                  <h3 className="title">{assignment.title}</h3>
                  <p className="desc">Description:</p> {assignment.description}
                  <span className={` badge ${assignment.difficulty}`} >{assignment.difficulty}</span>
                </div>
                <div className="start-task">Start Task</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentsPage;
