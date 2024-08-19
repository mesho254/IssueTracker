import axios from "axios";

const API_URL = "http://localhost:5000/api/issues";

export const getIssues = () => axios.get(API_URL);
export const createIssue = (issue) => axios.post(API_URL, issue);
export const updateIssue = (id, issue) => axios.put(`${API_URL}/${id}`, issue);
export const deleteIssue = (id) => axios.delete(`${API_URL}/${id}`);
