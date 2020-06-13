import { types } from '../actions/actionTypes';
const initialState = {
  language: 'en',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
