import axios from '../utils/axios'


export const loadInfo = () => async (dispatch) => {
  const res = await axios.get(`/load_info/`);
  if (res.status === 200) {
    console.log(res.data)
    dispatch({
      type: "LOAD_INFO",
      payload: res.data,
    });
    dispatch({ type: "IS_LOAD_INFO", payload: true });
  }
};

export const handleTrack =
  ({ type, params }) =>
  async (dispatch) => {
    const res = await axios.post(
      `/track/handle_track/`,
      { type, params }
    );
    if (res.status === 200) {
      dispatch({ type: type, payload: res.data.item });
    }
  };

export const updateTrackPos = (source, des) => async (dispatch) => {
  const st_col = Number.parseInt(source.droppableId);
  const st_row = Number.parseInt(source.index);
  const end_col = Number.parseInt(des.droppableId);
  const end_row = Number.parseInt(des.index);
  // dispatch({
  //     type: "MOVE_TRACK",
  //     payload: [st_col, st_row, end_col, end_row]
  // })
  dispatch({
    type: "MOVE_TRACK",
    payload: [st_col, st_row, end_col, end_row],
  });
  const res = await axios.post(`/track/move/`, [
    st_col,
    st_row,
    end_col,
    end_row,
  ]);
  // if (res.status === 200) {
  // }
};

export const handleStep = (type, pre_title, title) => async (dispatch) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("title", title);
  formData.append("pre_title", pre_title);
  const res = await axios.post(
    `/track/handle_title/`,
    formData
  );
  if (res.status === 200) {
    if (type === "UPDATE_TITLE") {
      dispatch({
        type: type,
        payload: [pre_title, title],
      });
    } else {
      dispatch({
        type: type,
        payload: title,
      });
    }
  }
};
