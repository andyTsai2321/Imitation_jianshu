import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";
class List extends PureComponent {
  render() {
    const { articles, changeHomeList, page } = this.props;
    const newList = articles.toJS();
    return (
      <div id="listId">
        {newList.map((item, index) => (
          <Link key={index} to={`/detail${item.id}`}>
            <div className="list-container">
              <div className="list-content" key={item.id}>
                <h3 className="list-title">{item.title}</h3>
                <p className="list-desc">{item.desc}</p>
              </div>
              <a to="/" className="list-img">
                <img alt="" src={`https://${item.imgUrl}`} />
              </a>
            </div>
          </Link>
        ))}
        <a onClick={() => changeHomeList(page)} className="readMore-btn">
          閱讀更多
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.getIn(["home", "articles"]),
    page: state.getIn(["home", "articlesPage"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeHomeList(page) {
      dispatch(actionCreators.getMoreList(page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
