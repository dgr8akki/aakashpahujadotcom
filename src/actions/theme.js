import { types } from './actionTypes';

export const enableDarkMode = data => dispatch => {
  dispatch({
    type: types.ENABLE_DARK_MODE,
    payload: data,
  });
};
