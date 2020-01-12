import jotter from '../apis/jotter';
import { SIGN_IN, SIGN_IN_WITH_EMAIL, SIGN_OUT, CREATE_NOTE, RESET_ERROR_MESSAGE, DELETE_NOTE, FETCH_NOTES_REQUEST, FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILURE } from './types';
import jwtDecode from 'jwt-decode';
import history from '../history';


export const signInWithToken = (userId) => {
  history.push('/wall');

  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signInWithEmail = ({ email, password }) => async dispatch => {
  const response = await jotter.post('/users/signin', { email, password });
  console.log('response? ', response);

  localStorage.setItem('token', response.data.token);

  const userData = jwtDecode(response.data.token);

  dispatch({
    type: SIGN_IN_WITH_EMAIL,
    payload: userData.userId,
  });

  history.push('/wall');
};

export const signOut = () => {
  localStorage.removeItem('token');

  history.push("/");
  return {
    type: SIGN_OUT
  };
};

export const fetchNotes = () => async dispatch => {
  dispatch({ type: FETCH_NOTES_REQUEST });

  try {
    const response = await jotter.get('/notes');

    dispatch({
      type: FETCH_NOTES_SUCCESS,
      payload: response.data.notes
    });
  } catch ({ response }) {
    console.log(response)
    if (!response || response.status === 401) { // if unauthorized, signout
      dispatch(signOut());
    }
    dispatch({
      type: FETCH_NOTES_FAILURE,
      error: true
    });
  }
};

export const createNote = note => async (dispatch, getState) => {
  const { userId } = getState().auth;
  console.log(note);
  const response = await jotter.post('/notes', { content: note, userId });

  console.log('response', response);

  dispatch({
    type: CREATE_NOTE,
    payload: response.data.createdNote
  });
}

export const deleteNote = noteId => async (dispatch) => {
  await jotter.delete('/notes/' + noteId);

  dispatch({
    type: DELETE_NOTE,
    payload: noteId
  });
}

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
})