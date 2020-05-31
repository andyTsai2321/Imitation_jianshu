import * as constants from "./constants";
import { fromJS } from "immutable";
import axios from "axios";

const detail = (result) => ({
  type: constants.GET_DETAIL,
  title: fromJS(result.title),
  content: fromJS(result.content),
});
export const getDetail = (id) => {
  return (dispatch) => {
    axios
      .get(`/api/detail.json?id=${id}`)
      .then((res) => {
        const result = res.data.data;
        const action = detail(result);
        dispatch(action);
      })
      .catch(() => {
        console.log("請重試");
      });
  };
};
