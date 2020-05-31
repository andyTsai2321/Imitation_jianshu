import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Write extends PureComponent {
  
  render() {
    console.log(this.props.loginStatu)
    {
      return !this.props.loginStatus ? (
        <Redirect to="/login" />
      ) : (
        <div>開始寫文章</div>
      );
    }
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(["login", "login"]),
});

const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapState, mapDispatchToProps)(Write);
