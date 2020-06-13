import { types } from './actionTypes';

export const changeLanguage = lang => dispatch => {
  dispatch({
    type: types.CHANGE_LANGUAGE,
    payload: lang,
  });
};
