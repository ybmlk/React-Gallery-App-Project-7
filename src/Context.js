import React, { Component } from 'react';
import axios from 'axios';
// Import Api-key
import apiKey from './config';
// Refers to the number of photos displyed
const numOfPhotos = 24;

const Context = React.createContext();

class Provider extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      title: '',
      loading: true,
    };
  }

  // Fetches photos from Flickr API and updates the states
  performSearch = query => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${numOfPhotos}&format=json&nojsoncallback=1`;
    axios
      .get(url)
      .then(res => {
        this.setState(() => ({
          photos: res.data.photos.photo,
          // The argument passed to this function will be the title
          title: query,
          loading: false,
        }));
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };
  render() {
    const value = {
      state: { ...this.state },
      search: this.performSearch,
    };
    return <Context.Provider value={value}>{this.props.children}</Context.Provider>;
  }
}

const Consumer = Context.Consumer;

const withContext = Component => {
  return props => {
    return (
      <Context.Consumer>{context => <Component {...props} context={context} />}</Context.Consumer>
    );
  };
};

export default withContext;
export { Provider, Consumer };
