import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getCurrentUser } from './services/authService';
import Movies from "./components/Movies";
import Navbar from "./components/common/Navbar";
import Customers from './components/Customers';
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import Logout from './components/common/Logout';
import ProtectedRoute from './components/common/ProtectedRoute';
import RegisterForm from './components/RegisterForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  links = [
    { path: "/movies", name: "Movies" },
    { path: "/customers", name: "Customers" },
    { path: "/rentals", name: "Rentals" },
    { path: "/login", name: "Login" },
    { path: "/register", name: "Register" },
    { path: "/profile" },
    { path: "/logout", name: "Logout" }
  ]

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({user});
  }
  
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer/>
        <Navbar user={user} title="VideoActive" links={this.links} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/logout" component={Logout}/>
            <ProtectedRoute path="/movies/:id" component={MovieForm}/>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies" render={props => <Movies {...props} user={user}/>}/>
            <Route path="/register" component={RegisterForm}/>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
