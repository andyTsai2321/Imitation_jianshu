import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import {withRouter} from 'react-router-dom'
import "./style.css";
class Detail extends Component {
  componentDidMount() {
    this.props.getDetailData(this.props.match.params.id);
  }
  render() {
    return (
      <div className="detail-wrap">
        <div className="detail-header">{this.props.title}</div>
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  title: state.getIn(["detail", "title"]),
  content: state.getIn(["detail", "content"]),
});

const mapDispatchToProps = (dispatch) => ({
  getDetailData(id) {
    const action = actionCreators.getDetail(id);
    dispatch(action);
  },
});
export default connect(mapState, mapDispatchToProps)(withRouter(Detail));
