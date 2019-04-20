import Movies from "./components/Movies";
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="container">
      <Movies></Movies>
      </main>
    );
  }
}

export default App;
