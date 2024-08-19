import React, { useState } from "react";
import { List, Button, Input, Modal, Select } from "antd";

const { Option } = Select;

const IssueList = ({ issues, onEdit, onDelete, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredIssues = issues ? issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter ? issue.priority === priorityFilter : true;
    return matchesSearch && matchesPriority;
  }) : [];


  const confirmDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this issue?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        if (id) {
          await onDelete(id);
        } else {
          console.error('Invalid issue ID');
        }
      },
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <Input
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "16px", width: "200px" }}
        />
        <Select
          placeholder="Filter by priority"
          value={priorityFilter}
          onChange={(value) => setPriorityFilter(value)}
          style={{ marginRight: "16px", width: "150px" }}
        >
          <Option value="">All</Option>
          <Option value="Low">Low</Option>
          <Option value="Normal">Normal</Option>
          <Option value="High">High</Option>
        </Select>
        <Button type="primary" onClick={onAddNew}>Add New</Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={filteredIssues}
        renderItem={(issue) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => onEdit(issue)}>Edit</Button>,
              <Button type="link" danger onClick={() => confirmDelete(issue.id)}>Delete</Button>
            ]}
            >
            <List.Item.Meta
              title={issue.title}
              description={`Priority: ${issue.priority} - ${issue.description}`}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default IssueList;
