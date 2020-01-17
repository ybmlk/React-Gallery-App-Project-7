import React, { Component } from 'react';
import Photo from './Photo';
import { withRouter } from 'react-router';
import NotFound from './NotFound';
import Loading from './Loading';

class Gallery extends Component {

  componentDidMount() {
    this.input = this.props.match.params.input;
    this.props.onSearch(this.input)
  }

  render() {
    const results = this.props.data
    let photos;
    let title;

    if (results.length > 0) {
      photos = results.map((photo, index) => <Photo {...photo} key={index} />)
      title = this.props.title.toUpperCase()

    } else if (this.props.loading) {
      photos = <Loading />

    } else {
      photos = <NotFound />
    }


    return (
      <div className="photo-container">
        <h2>{title} </h2>
        <ul>
          {photos}
        </ul>
      </div>
    )
  }
}

export default withRouter(Gallery);