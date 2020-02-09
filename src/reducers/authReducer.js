import { SIGN_IN, SIGN_OUT, SIGN_IN_WITH_EMAIL, CONFIRM_USER_SUCCESS, CONFIRM_USER_REQUEST, CONFIRM_USER_FAILURE } from '../actions/types'

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_IN_WITH_EMAIL:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case 'SIGN_IN_FAILED':
      return { ...state };
    case CONFIRM_USER_REQUEST:
      return { ...state, isVerifying: true };
    case CONFIRM_USER_SUCCESS:
      return { ...state, isVerifying: false, userWasVerified: true };
    case CONFIRM_USER_FAILURE:
      return { ...state, isVerifying: false };
    default:
      return state;
  }

}