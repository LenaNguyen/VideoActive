import Movies from "./components/Movies";
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  handlePageChange = (page) => {
    this.setState({page})
    console.log(page);
  }
  render() {
    return (
      <main className="container">
      <Movies/>
      </main>
    );
  }
}

export default App;
