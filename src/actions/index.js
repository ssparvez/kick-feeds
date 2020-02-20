import jotter from '../apis/jotter';
import {
  SIGN_IN,
  SIGN_IN_WITH_EMAIL,
  SIGN_OUT,
  CREATE_NOTE,
  RESET_ERROR_MESSAGE,
  DELETE_NOTE,
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  EDIT_NOTE,
  CREATE_TAG,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  SIGN_UP,
  CONFIRM_USER_REQUEST,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAILURE,
  FETCH_TAG,
  EDIT_TAG,
  DELETE_TAG
} from './types';
import jwtDecode from 'jwt-decode';
import history from '../history';


export const signInWithToken = (userId) => {
  // history.push('/wall');

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

  console.log('hey')
  history.push('/wall');
};

export const signUp = ({ email, password }) => async dispatch => {
  try {
    await jotter.post('/users/signup', { email, password });
    // console.log('response? ', response);


    dispatch({
      type: SIGN_UP,
      // payload: userData.userId,
    });

    history.push('/signup?email-sent=true')
  } catch (err) {

  }
};

export const signOut = () => {
  localStorage.removeItem('token');

  history.push("/");
  return {
    type: SIGN_OUT
  };
};

export const confirmUser = (token) => async dispatch => {
  dispatch({ type: CONFIRM_USER_REQUEST });

  try {
    await jotter.post('/users/confirmation', { token });

    dispatch({
      type: CONFIRM_USER_SUCCESS,
    })
    // then sign in?
  } catch (err) {
    dispatch({
      type: CONFIRM_USER_FAILURE
    })
  }
};

export const fetchNotes = (options = {}) => async dispatch => {
  dispatch({ type: FETCH_NOTES_REQUEST });

  let query = '';
  if (Object.keys(options).length > 0) {
    query += '?';
    for (let key in options) {
      query += `${key}=${options[key]}`;
    }
  }

  try {
    const response = await jotter.get('/notes' + query);

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
  const response = await jotter.post('/notes', { ...note, userId });

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

export const createTag = tag => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await jotter.post('/tags', { ...tag, userId });

  console.log('response', response);

  dispatch({
    type: CREATE_TAG,
    payload: response.data.createdTag
  });

  history.push('/tags');
}

export const editNote = (noteId, values) => async dispatch => {
  // PATCH: replace specfic properties, PUT: replace all properties
  const response = await jotter.patch('/notes/' + noteId, values);

  console.log(response);

  dispatch({
    type: EDIT_NOTE,
    payload: response.data
  });

  // history.push('/');
}

export const fetchTags = () => async dispatch => {
  dispatch({ type: FETCH_TAGS_REQUEST });

  try {
    const response = await jotter.get('/tags');

    dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: response.data.tags
    });
  } catch ({ response }) {
    console.log(response)
    if (!response || response.status === 401) { // if unauthorized, signout
      dispatch(signOut());
    }
    dispatch({
      type: FETCH_TAGS_FAILURE,
      error: true
    });
  }
};

export const fetchTag = (tagId) => async dispatch => {
  const response = await jotter.get('/tags/' + tagId);

  console.log(response);
  dispatch({
    type: FETCH_TAG,
    payload: response.data
  });
};

export const editTag = (tagId, values) => async dispatch => {
  // PATCH: replace specfic properties, PUT: replace all properties
  const response = await jotter.patch('/tags/' + tagId, values);

  console.log(response);

  dispatch({
    type: EDIT_TAG,
    payload: response.data
  });

  history.push('/tags');
}

export const deleteTag = tagId => async dispatch => {
  await jotter.delete('/tags/' + tagId);

  dispatch({
    type: DELETE_TAG,
    payload: tagId
  });

  history.push('/tags');
}

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
});