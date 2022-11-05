
import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Nav.css';
import logo from '../movie_matcher_logo.png';
function Nav(props) {
  const logged_out_nav = (
    <ul className={"navbar-nav mr-auto"}>
      <li className={"nav-item"} onClick={() => props.display_form('login')}>Login</li>
      <li className={"nav-item"} onClick={() => props.display_form('signup')}>SignUp</li>
    </ul>
  );
  const logged_in_nav = (
    <ul className={"navbar-nav mr-auto"}>
      <li className={"nav-item"} onClick={props.handle_logout}>logout</li>
    </ul>
  );
  return <div className={"navbar navbar-expand-lg navbar-dark bg-dark fixed-top text-light"}><img className={"navbar-brand"} src={logo} alt={"Movie Matcher Logo"}/>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}
export default Nav;
Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
    