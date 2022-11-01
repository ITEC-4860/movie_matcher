
import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from "react-router-dom";
class SignupForm extends React.Component {
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
      <form className="formFields" onSubmit={e => this.props.handle_signup(e, this.state)}>
            <div className="formField">
                <h4>Sign Up</h4>
        <label className="formFieldLabel" htmlFor="username">
            Username
        </label>
        <input
          type="text"
          name="username"
          className="formFieldInput"
           placeholder="Enter your username"
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


             <div className="formField">
                            <button className="formFieldButton">Sign Up</button>{" "}
                            <Link to="/LoginForm" className="formFieldLink">
                               I'm already member
                            </Link>

        {/*<input type="submit" />*/}

                      </div>
      </form>
                </div>
    );

  }
}
export default SignupForm;
SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
    