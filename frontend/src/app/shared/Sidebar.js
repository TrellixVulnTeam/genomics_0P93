import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Trans } from "react-i18next";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/basic-ui", state: "basicUiMenuOpen" },

      { path: "/form-elements", state: "formElementsMenuOpen" },

      // {path:'/user-pages', state: 'userPagesMenuOpen'},
      { path: "/error-pages", state: "errorPagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li
            className={
              this.isPathActive("/dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/basic-ui/Analysis")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/basic-ui/Analysis">
              <span className="menu-title">
                <Trans>Analysis</Trans>
              </span>
              <i className="mdi mdi-file-find menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/basic-ui/reports")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/basic-ui/reports">
              <span className="menu-title">
                <Trans>Reports</Trans>
              </span>
              <i className="mdi mdi-information menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/basic-ui/Basespace")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/basic-ui/Basespace">
              <span className="menu-title">
                <Trans>Basespace</Trans>
              </span>
              <i className="mdi mdi-human-male-female menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/basic-ui/#") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/basic-ui/#">
              <span className="menu-title">
                <Trans>settings</Trans>
              </span>
              <i className="mdi mdi-settings menu-icon"></i>
            </Link>
          </li>

          {/*        
           <li className={ this.isPathActive('/icons') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Settings</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-settings"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } to="/icons/mdi"><Trans>Material</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
  
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
