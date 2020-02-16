import React, { Component } from 'react';
import Photo from './Photo';
import { withRouter } from 'react-router';
import NotFound from './NotFound';
import Loading from './Loading';

class Gallery extends Component {
  componentDidMount() {
    // Responds to inputs provided directly in the url bar
    this.input = this.props.match.params.input;
    this.props.onSearch(this.input);
  }

  render() {
    const { photos, loading, title } = this.props;
    let output;

    // If the current photo state isn't empty, it renders <Photo /> for each item(photo)
    if (photos.length) {
      output = photos.map((photo, index) => <Photo {...photo} key={index} />);

      // If API is still fetiching(loading), it renders <Loading />
    } else if (loading) {
      output = <Loading />;

      // After it finishes loading if there is no data, it renders <NotFound />
    } else {
      output = <NotFound />;
    }

    return (
      <div className='photo-container'>
        <h2>{photos.length && title.toUpperCase()}</h2>
        <ul>{output}</ul>
      </div>
    );
  }
}

export default withRouter(Gallery);
