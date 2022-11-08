
import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import MoviePage from "./components/MoviePage";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('refresh') ? true : false,
      username: ''
    };
  }
  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem('access')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }
  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.refresh)
        console.log(json.access)
        localStorage.setItem('access', json.access);
        localStorage.setItem('refresh', json.refresh);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };
  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('access', json.access);
        localStorage.setItem('refresh', json.refresh);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };
  handle_logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.setState({ logged_in: false, username: '' });
  };
  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };
  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'movie':
        form = <MoviePage query={18} />;
        break;
      default:
        form = null;
    }
    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
      </div>
    );
  }
}
export default App;
    