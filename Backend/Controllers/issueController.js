const issues = require("../Models/issueModel");

// Function to generate a new unique ID
const generateId = () => {
    // Find the highest ID in the existing issues and add 1
    return issues.length > 0 ? Math.max(...issues.map(issue => issue.id)) + 1 : 1;
  };

const getIssues = (req, res) => {
    const { type } = req.query;
    let filteredIssues = issues;
  
    if (type === "urgent") {
      filteredIssues = issues.filter(issue => issue.priority === "High");
    } else if (type === "normal") {
      filteredIssues = issues.filter(issue => issue.priority === "Normal");
    }
  
    res.json(filteredIssues);
  };

  
  const createIssue = (req, res) => {
    const newIssue = { ...req.body, id: generateId() }; // Add a new ID
    issues.push(newIssue);
    console.log("Created:", newIssue);
    res.status(201).json(newIssue);
  };

const updateIssue = (req, res) => {
  const { id } = req.params;
  const updatedIssue = req.body;
  const index = issues.findIndex(issue => issue.id == id);
  if (index !== -1) {
    issues[index] = updatedIssue;
    console.log("Updated:", updatedIssue);
    res.json(updatedIssue);
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
};

const deleteIssue = (req, res) => {
  const { id } = req.params;
  const index = issues.findIndex(issue => issue.id == id);
  if (index !== -1) {
    const deletedIssue = issues.splice(index, 1);
    console.log("Deleted:", deletedIssue);
    res.json(deletedIssue);
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
};

module.exports = { getIssues, createIssue, updateIssue, deleteIssue };
