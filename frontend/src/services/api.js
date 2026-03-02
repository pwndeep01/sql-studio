import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({
  baseURL: "https://sql-studio-hrvt.onrender.com/api",
});
// https://sql-studio-hrvt.onrender.com/

export const getAssignmentById = (id) => API.get(`/assignments/${id}`);

export const runQuery = (data) => API.post("/assignments/run", data);

export const submitQuery = (data) => API.post("/assignments/submit", data);

export const getAssignments = (difficulty) => {
  return API.get("/assignments", {
    params: difficulty ? { difficulty } : {},
  });
};