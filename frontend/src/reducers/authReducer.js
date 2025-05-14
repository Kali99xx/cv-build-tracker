import axios from '../utils/axios'


const token = localStorage.getItem("token");
const initialState = {
  user: null, // ✅ Ensure user exists in the initial state
  isAuthenticated: token ? true : false,
  token: token || null,
  loading: true,
};
axios.defaults.headers["Authorization"] = "Bearer " + token;
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers["Authorization"] =
        "Bearer " + action.payload.token;
      return {
        ...state,
        user: action.payload.user, // ✅ Ensure user is set properly
        isAuthenticated: true,
        token: action.payload.token,
        loading: false,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
