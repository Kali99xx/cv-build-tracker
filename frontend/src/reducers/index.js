import { combineReducers } from "redux";
import trackReducer from "./trackReducer";
import authReducer from "./authReducer";
export default combineReducers({
  track: trackReducer,
  auth: authReducer,
});
