import React, { PureComponent } from "react";

import Autor from "./components/Author";
import List from "./components/List";
import { connect } from "react-redux";
import Recommend from "./components/Recommend";
import Topic from "./components/Topic";

import { actionCreators } from "./store";

import "./home.css";

class Home extends PureComponent {
  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvent();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.props.changeScroll);
  }
  handleScrollTop = () => {
    this.scrollToTop();
  };
  scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };
  bindEvent = () => {
    window.addEventListener("scroll", this.props.changeScroll);
  };
  render() {
    return (
      <div className="home-container">
        <div className="row">
          <div className="col-sm-8">
            <img
              className="banner"
              alt=""
              src="https://goodmockups.com/wp-content/uploads/2018/04/Free-Rectangle-Frame-Standing-Banner-Mockup-PSD.jpg"
            />
            <Topic />
            <List />
          </div>
          <div className="col-sm-4">
            <Recommend />
            <Autor />
          </div>
        </div>
        {this.props.showScroll ? (
          <div onClick={() => this.handleScrollTop()} className="back-to-top">
            <i className="fa fa-angle-up" aria-hidden="true"></i>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapState = (state) => ({
  showScroll: state.getIn(["home", "showScroll"]),
});
const mapDispatchToProps = (dispatch) => ({
  changeHomeData() {
    const action = actionCreators.getHomeInfo();
    dispatch(action);
  },
  changeScroll(e) {
    if (document.documentElement.scrollTop > 100) {
      const action = actionCreators.toggleTopShow(true);
      dispatch(action);
    } else {
      const action = actionCreators.toggleTopShow(false);
      dispatch(action);
    }
  },
});

export default connect(mapState, mapDispatchToProps)(Home);
