import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function Nav(props) {
  const logged_out_nav = (
    <ListGroup className={"navList"} horizontal={true}>
      <ListGroupItem action={true} onClick={() => props.display_form('login')}>Login</ListGroupItem>
      <ListGroupItem action={true} onClick={() => props.display_form('signup')}>Signup</ListGroupItem>
    </ListGroup>
  );
  const logged_in_nav = (
    <ListGroup className={"navList"} horizontal={true}>
      <ListGroupItem action={true} onClick={() => props.display_form('friends')}>Friends</ListGroupItem>
      <ListGroupItem action={true} onClick={props.handle_logout}>Logout</ListGroupItem>
    </ListGroup>
  );
    return (props.logged_in ? logged_in_nav : logged_out_nav);
}
export default Nav;
Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
    