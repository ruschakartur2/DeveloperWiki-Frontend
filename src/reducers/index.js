import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import articles from './article'

export default combineReducers({
  auth,
  message,
  articles
});
