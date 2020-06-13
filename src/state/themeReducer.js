import { types } from '../actions/actionTypes';

const initialState = {
  isDarkMode: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ENABLE_DARK_MODE:
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};
