// src/App.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIssues, addIssue, EditIssue, RemoveIssue } from './Redux/issuesActions';
import IssueList from './components/issueList';
import IssueForm from './components/issueForm';
import { Layout, Row, Col, Spin, message } from 'antd';

const { Header, Content } = Layout;

function App() {
  const dispatch = useDispatch();
  const { issues, loading } = useSelector((state) => state.issues);
  const [editingIssue, setEditingIssue] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  const handleCreateOrUpdate = async (issue) => {
    if (editingIssue) {
      await dispatch(EditIssue(editingIssue.id, issue));
      message.success('Issue updated successfully.');
    } else {
      await dispatch(addIssue({ ...issue, id: issues.length + 1 }));
      message.success('Issue created successfully.');
    }
    setEditingIssue(null);
    setIsModalVisible(false);
  };

  const handleEdit = (issue) => {
    setEditingIssue(issue);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await dispatch(RemoveIssue(id));
    message.success('Issue deleted successfully.');
  };

  const handleAddNew = () => {
    setEditingIssue(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditingIssue(null);
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Header style={{ color: '#fff', textAlign: 'center' }}>
        <h1>Issue Tracker</h1>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16}>
            {loading ? (
              <Spin tip="Loading issues..." />
            ) : (
              <>
                <IssueList issues={issues} onEdit={handleEdit} onDelete={handleDelete} onAddNew={handleAddNew} />
                <IssueForm
                  visible={isModalVisible}
                  onCreate={handleCreateOrUpdate}
                  onCancel={handleCancel}
                  issue={editingIssue}
                  loading={loading}
                />
              </>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
