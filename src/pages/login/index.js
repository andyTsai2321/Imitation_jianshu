import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actionCreators } from "./store";

import "./style.css";
class Login extends PureComponent {
  
  render() {
    console.log(this.props.loginStatu)
    {
      return !this.props.loginStatus ? (
        <div className="login-wrap">
          <div className="login-box">
            <input
              placeholder="帳號"
              ref={(input) => {
                this.account = input;
              }}
            />
            <input
              placeholder="密碼"
              type="password"
              ref={(input) => {
                this.password = input;
              }}
            />
            <button
              onClick={() => this.props.login(this.account, this.password)}
            >
              登入
            </button>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      );
    }
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(["login", "login"]),
});

const mapDispatchToProps = (dispatch) => ({
  login(accountElem, passwordElem) {
    dispatch(actionCreators.login(accountElem.value, passwordElem.value));
  },
});
export default connect(mapState, mapDispatchToProps)(Login);
