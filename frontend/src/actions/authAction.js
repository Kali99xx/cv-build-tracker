import axios from '../utils/axios'

export const loginUser = (userID, password) => async (dispatch) => {
  try {
    const res = await axios.post(`/login`, {
      userID,
      password,
    });
    if (res.status === 200) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: {}, token: res.data.access_token }, // Ensure user is included in payload
      });
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
