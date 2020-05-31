import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as loginActionCreators } from "../../pages/login/store";
import { Link } from "react-router-dom";

class Header extends Component {
  showSearchInfo = () => {
    const {
      focused,
      list,
      page,
      totalPage,
      mouseIn,
      handleMouseIn,
      handleMouseLeave,
      handleChangePage,
    } = this.props;
    const newList = list.toJS();
    const pageList = [];
    if (newList.length) {
      for (let index = (page - 1) * 5; index < page * 5; index++) {
        pageList.push(
          <Link to="/" key={newList[index]}>
            {newList[index]}
          </Link>
        );
      }
    }

    if (focused || mouseIn) {
      return (
        <div
          className="search-info"
          onMouseEnter={() => handleMouseIn()}
          onMouseLeave={() => handleMouseLeave()}
        >
          <div className="search-info-title">
            <span>熱門搜索</span>
            <span
              className="search-change-page"
              onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
              <i
                ref={(icon) => {
                  this.spinIcon = icon;
                }}
                className="fa fa-refresh"
              />
              換一批
            </span>
          </div>
          <div className="tag">{pageList}</div>
        </div>
      );
    } else {
      return null;
    }
  };
  render() {
    const {
      list,
      focused,
      handleInputFocus,
      handleInputBlur,
      login,
      logout
    } = this.props;
    return (
      <div id="header">
        <Link to="/">
          <a href="/" className="logo" />
        </Link>
        <nav>
          <span className="nav-left">
            <span className="button">首頁</span>
            <span className="button">下載APP</span>
            <span className="search-wrap">
              <input
                type="text"
                placeholder="搜索"
                className={focused ? "focused search-input" : "search-input"}
                onFocus={() => handleInputFocus(list)}
                onBlur={() => handleInputBlur()}
              />
              <i
                className={focused ? "fa fa-search focused" : "fa fa-search"}
                aria-hidden="true"
              ></i>

              {this.showSearchInfo()}
            </span>
          </span>
          <span className="nav-right">
            <span>Aa</span>

            {login ? (
              <span onClick={()=>logout()}>登出</span>
            ) : (
  
              <Link to='/login'><span>登入</span></Link>
            )}

            <button>註冊</button>
            <Link to='/write'><button className="color-reg">寫文章</button></Link>
          </span>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(["header", "focused"]),
    mouseIn: state.getIn(["header", "mouseIn"]),
    list: state.getIn(["header", "list"]),
    page: state.getIn(["header", "page"]),
    totalPage: state.getIn(["header", "totalPage"]),
    login: state.getIn(["login", "login"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      if (list.size === 0) {
        dispatch(actionCreators.getList());
      }

      dispatch(actionCreators.searchFocus());
    },

    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseIn() {
      dispatch(actionCreators.mouseIn());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page, totalPage, spin) {
      // icon旋轉
      let originAngle = spin.style.transform.replace(/[^0-9]/gi, "");
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = `rotate(${originAngle + 360}deg)`;

      //換頁
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));
      } else {
        dispatch(actionCreators.changePage(1));
      }
    },
    logout(){
      dispatch(loginActionCreators.logout())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
