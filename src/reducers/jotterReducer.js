import { CREATE_NOTE, DELETE_NOTE, FETCH_NOTES_REQUEST, FETCH_NOTES_SUCCESS } from "../actions/types";

const INITIAL_STATE = { // possible default to root level?
  notes: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTES_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_NOTES_SUCCESS:
      // console.log(action.payload)
      return { ...state, isFetching: false, notes: action.payload };
    case CREATE_NOTE:
      console.log(action.payload);
      return { ...state, notes: [...state.notes, action.payload] };
    case DELETE_NOTE: // returns array copy and omits the object of the id passed in
      return { ...state, notes: state.notes.filter(note => note._id !== action.payload) };
    default:
      return state;
  }
}