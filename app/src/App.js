import React, {Component} from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Friends from "./components/Friends";
import logo from './movie_matcher_logo.png';
import ToolBar from "./components/ToolBar";
import Profile from "./components/Profile";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: false,
            username: '',
            profilePic: '',
            favMovies: [],
            favGenres: [],
            search: '',
            sort: '',
            yearA: '',
            yearB: '',
            runtime: '',
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/current_user/', {
            headers: {
                Authorization: `Bearer  ${localStorage.getItem('access')}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        this.setState({logged_in: true, username: data.username})
                    })
                } else {
                    this.setState({displayed_form: 'login'})
                }
            });
    }

    movieMatch = (information) => {
        this.setState({
            search: information.search
        });
        this.display_form("matchLibrary");
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
                localStorage.setItem('access', json.access);
                localStorage.setItem('refresh', json.refresh);
                fetch('http://localhost:8000/api/current_user/', {
                    headers: {
                        Authorization: `Bearer  ${localStorage.getItem('access')}`
                    }
                })
                    .then(async (res) => {
                        const data = await res.json();
                        this.setState({
                            logged_in: true,
                            displayed_form: '',
                            username: data.username
                        });
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
        this.setState({logged_in: false, username: '', displayed_form: 'login'});
    };
    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };
    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            const newState = {...prevState};
            newState[name] = value;
            return newState;
        });
    };

    render() {
        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login}/>;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup}/>;
                break;
            case 'friends':
                form = <Friends username={this.state.username}/>;
                break;
            case 'library':
                form = <ToolBar/>;
                break;
            case 'matchLibrary':
                form = <ToolBar genres={this.state.search}/>;
                break;
            case 'profile':
                form = <Profile username={this.state.username}
                                image={'https://c8.alamy.com/comp/GKBXCP/sad-old-man-GKBXCP.jpg'}
                                favMovies={[200, 15, 500, 12, 76, 17, 13, 35, 11, 16, 25, 137]}
                                favGenres={["Action", "Comedy", "Thriller"]}/>;
                break;
            default:
                form = null;
        }
        return (
            <div className="App">
                <span className={"topBar"}>
                    <img src={logo} alt={"This is the Logo"}/>
                <Nav
                    logged_in={this.state.logged_in}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                />
                <h3>
                    {this.state.logged_in
                        ? `Hello, ${this.state.username}`
                        : 'Please Log In'}
                </h3>
                </span>
                <span className={"form"}>
                {form}
                </span>
            </div>
        );
    }
}

export default App;
    