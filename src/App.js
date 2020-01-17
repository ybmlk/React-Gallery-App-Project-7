import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

// Import Components
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import Gallery from './Components/Gallery';
import NotFound from './Components/NotFound';

// Import Api-key
import apiKey from './config';
const numOfPhotos = 24;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      query: '',
      loading: true
    }
  }


  performSearch = (query) => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${numOfPhotos}&format=json&nojsoncallback=1`
    axios.get(url)
      .then(res => {
        this.setState({
          photos: res.data.photos.photo,
          query: query
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Navigation onSearch={this.performSearch} />
          <Switch>
            <Route exact path="(/|/gallery)" render={() => <Redirect to="/gallery/nature" />} />
            <Route exact path="/gallery/:input" render={() => (
              <Gallery
                data={this.state.photos}
                query={this.state.query}
                onSearch={this.performSearch} />
            )} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}
