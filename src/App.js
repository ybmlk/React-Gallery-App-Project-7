import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

// Import Components
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import Gallery from './Components/Gallery';

// Import Api-key
import apiKey from './config';
const numOfPhotos = 24;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      query: 'nature',
      photos: [],
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch()
  }


  performSearch = (query = this.state.query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${numOfPhotos}&format=json&nojsoncallback=1`)
      .then((res) => {
        this.setState({
          query: query.toUpperCase(),
          photos: res.data.photos.photo
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" render={() => <SearchForm onSearch={this.performSearch} />} />
          <Route path="/" render={() => <Navigation onSearch={this.performSearch} />} />
          <Route path="/" render={() => <Gallery data={this.state.photos} query={this.state.query} />} />
        </div>
      </BrowserRouter>

    );
  }

}
