import React, { Component } from 'react';

// Import Components
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import Gallery from './Components/Gallery';
import axios from 'axios';

// Import Api-key
import apiKey from './config';
const numOfPhotos = 24;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch()
  }


  performSearch = (query = 'nature') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${numOfPhotos}&format=json&nojsoncallback=1`)
      .then((res) => {
        this.setState({
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
      <div className="container">
        <SearchForm />
        <Navigation />
        <Gallery data={this.state.photos} />
      </div>
    );
  }

}
