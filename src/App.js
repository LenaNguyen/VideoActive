import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from "./components/Movies";
import Navbar from "./components/common/Navbar";
import Customers from './components/Customers';
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import './App.css';
import MovieForm from './components/MovieForm';

class App extends Component {
  links = [
    { path: "/movies", name: "Movies" },
    { path: "/customers", name: "Customers" },
    { path: "/rentals", name: "Rentals" }
  ]

  render() {
    return (
      <React.Fragment>
        <Navbar title="VideoActive" links={this.links} />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies" component={Movies} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
