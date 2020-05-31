import React, { PureComponent  } from "react";
import { connect } from "react-redux";

class Topic extends PureComponent  {
  render() {
    const { topicList } = this.props;
    const newList = topicList.toJS();
    return (
      <div id="topicId">
        {newList.map((item, index) => (
          <div className="topic-item" key={item.id}>
            <img alt="" className="topic-pic" src={item.imgUrl} />
            <span alt="" className="topic-text">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topicList: state.getIn(["home", "topicList"]),
  };
};

export default connect(mapStateToProps)(Topic);
