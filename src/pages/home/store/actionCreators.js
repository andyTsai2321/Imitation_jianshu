import * as constants from "./constants";
import { fromJS } from "immutable";
import axios from "axios";

const changeHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articles: result.articleList,
});
const addHomeList = (result, nextPage) => ({
  type: constants.ADD_HOME_LIST,
  list: fromJS(result),
  nextPage,
});
export const getHomeInfo = () => {
  return (dispatch) => {
    axios
      .get("/api/home.json")
      .then((res) => {
        const result = res.data.data;
        const action = changeHomeData(result);
        dispatch(action);
      })
      .catch(() => {
        console.log("請重試");
      });
  };
};

export const getMoreList = (page) => {
  return (dispatch) => {
    axios
      .get(`/api/homeList.json?page=${page}`)
      .then((res) => {
        const result = res.data.data;
        const action = addHomeList(result, page + 1);
        dispatch(action);
      })
      .catch(() => {
        console.log("請重試");
      });
  };
};
export const toggleTopShow = (show) => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show,
});
