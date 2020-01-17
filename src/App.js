import React, { Component } from 'react';

// Import Components
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import Gallery from './Components/Gallery';


class App extends Component {

  render() {
    return (
      <div className="container">
        <SearchForm />
        <Navigation />
        <Gallery />
      </div>
    );
  }

}

export default App;
