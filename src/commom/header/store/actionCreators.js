import * as constants from "./constants";
import { fromJS } from "immutable";
import axios from "axios";
export const searchFocus = () => ({
  type: constants.SEARCH_FOCUS,
});

export const searchBlur = () => ({
  type: constants.SEARCH_BLUR,
});

export const mouseIn = () => ({
  type: constants.MOUSE_IN,
});

export const mouseLeave = () => ({
  type: constants.MOUSE_LEAVE,
});

export const changePage = (page) => ({
  type: constants.CHANGE_PAGE,
  page,
});
export const getList = () => {
  return (dispatch) => {
    axios
      .get("/api/headerList.json")
      .then((res) => {
        console.log(res);
        const data = res.data;
        dispatch(changeList(data.data));
      })
      .catch(() => {
        console.log("請重試");
      });
  };
};

const changeList = (data) => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10),
});
