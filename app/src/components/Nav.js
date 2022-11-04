
import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Nav.css';
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
  return <div className={"navbar navbar-expand-lg navbar-dark bg-dark text-light"}>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}
export default Nav;
Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
    