import { getIssues, createIssue, updateIssue, deleteIssue } from '../services/issueService';

export const fetchIssues = () => async (dispatch) => {
  dispatch({ type: 'FETCH_ISSUES_REQUEST' });
  try {
    const response = await getIssues();
    dispatch({ type: 'FETCH_ISSUES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_ISSUES_FAILURE' });
  }
};

export const addIssue = (issue) => async (dispatch) => {
  try {
    await createIssue(issue);
    dispatch({ type: 'ADD_ISSUE', payload: issue });
  } catch (error) {
    console.error(error);
  }
};

export const EditIssue = (id, issue) => async (dispatch) => {
  try {
    await updateIssue(id, issue);
    dispatch({ type: 'UPDATE_ISSUE', payload: issue });
  } catch (error) {
    console.error(error);
  }
};

export const RemoveIssue = (id) => async (dispatch) => {
    try {
      await deleteIssue(id);
      dispatch({ type: 'DELETE_ISSUE', payload: id });
    } catch (error) {
      console.error(error);
    }
  };