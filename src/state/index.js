import { combineReducers } from 'redux';
import theme from './themeReducer';
import i18n from './i18nReducer';
export default combineReducers({
  theme,
  i18n,
});
