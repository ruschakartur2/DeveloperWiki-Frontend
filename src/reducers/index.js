import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import articles from './article'
import comments from './comment'

export default combineReducers({
  auth,
  message,
  articles,
  comments
});
