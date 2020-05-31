import * as constants from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
  topicList: [],
  articles: [],
  articlesPage: 1,
  showScroll: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:
      console.log(action);
      return state.merge({
        topicList: fromJS(action.topicList),
        articles: fromJS(action.articles),
      });
    case constants.ADD_HOME_LIST:
      return state.merge({
        articles: state.get("articles").concat(action.list),
        articlesPage: action.nextPage,
      });
    case constants.TOGGLE_SCROLL_TOP:
      return state.set("showScroll", action.show);
    default:
      return state;
  }
};
