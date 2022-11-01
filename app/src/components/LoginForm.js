
import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from "react-router-dom";
class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  render() {
    return (
         <div className="formCenter">
      <form className="formFields" onSubmit={e => this.props.handle_login(e, this.state)}>
          <div className="formField">
              <h4>Log In</h4>
        <label className="formFieldLabel" htmlFor="username">
            Username
        </label>
        <input
          type="text"
          className="formFieldInput"
          placeholder="Enter your username"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
          </div>
          <div className="formField">
        <label className="formFieldLabel" htmlFor="password">
            Password
        </label>
        <input
          type="password"
          className="formFieldInput"
          placeholder="Enter your password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
  </div>

        {/*<input type="submit" />*/}
               <div className="formField">
                            <button className="formFieldButton">Sign In</button>{" "}
                            <Link to="/SignupForm" className="formFieldLink">
                                Create an account
                            </Link>
 </div>
      </form>
               </div>
    );
  }
}
export default LoginForm;
LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};
    