import React, { Component } from 'react';
import Photo from './Photo';
import { withRouter } from 'react-router';
import NotFound from './NotFound';
import Loading from './Loading';
import Modal from './Modal';

class Gallery extends Component {
  state = {
    photosLength: null,
    modalImg: '',
    modalImgId: null,
  };

  componentDidMount() {
    // Returns result for query provided directly in the url bar
    this.input = this.props.match.params.input;
    this.props.context.action.search(this.input);

    // Allows navigating between modals using the keyboard left and right keys
    window.addEventListener('keyup', e => {
      // If a modal is open...
      if (this.state.modalImg) {
        if (e.keyCode === 37) {
          this.prevModal();
        } else if (e.keyCode === 39) {
          this.nextModal();
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const photosLength = this.props.context.state.photos.length;
    if (prevState.photosLength !== photosLength) {
      this.setState(() => ({ photosLength }));
    }
  }

  // When an image is clicked, opens a modal and displays a bigger image
  zoomImage = e => {
    const clickedImg = e.target.src;
    const clickedImgId = parseInt(e.currentTarget.parentNode.id);
    this.setState(() => ({
      modalImg: clickedImg,
      modalImgId: clickedImgId,
    }));
  };

  // When next button is clicked, it loads the next image
  nextModal = () => {
    // Check if the current image is not the last one
    const lastPhoto = this.state.photosLength - 1;
    if (this.state.modalImgId < lastPhoto) {
      const nextImgId = this.state.modalImgId + 1;
      const nextImg = document.getElementById('photo-list').children[nextImgId].firstChild.src;
      this.setState(prevState => ({
        modalImg: nextImg,
        modalImgId: prevState.modalImgId + 1,
      }));
    }
  };

  // When Previous button is clicked, it loads the previous image
  prevModal = () => {
    // Check if the current image is not the first one
    if (this.state.modalImgId !== 0) {
      const prevImgId = this.state.modalImgId - 1;
      const prevImg = document.getElementById('photo-list').children[prevImgId].firstChild.src;
      this.setState(prevState => ({
        modalImg: prevImg,
        modalImgId: prevState.modalImgId - 1,
      }));
    }
  };

  // Closes image when clicked anywhere outside the image
  closeModal = e => {
    if (e.target.tagName === 'DIV') {
      this.setState(() => ({ modalImg: '' }));
    }
  };

  // Closes the image when the 'X' button is clicked
  closeModalBtn = () => {
    this.setState(() => ({ modalImg: '' }));
  };

  render() {
    const { photos, loading, title } = this.props.context.state;
    const {photosLength, modalImg, modalImgId} = this.state
    return (
      <div className='photo-container'>
        <h2>{photos.length ? title.toUpperCase() : null}</h2>
        <ul id='photo-list'>
          {photos.length ? (
            // If the current photos array isn't empty, it renders <Photo /> for each item(photo)
            photos.map((photo, index) => (
              <Photo {...photo} key={index} zoom={this.zoomImage} index={index} />
            ))
          ) : loading ? (
            // If API is still fetiching(loading), it renders <Loading />
            <Loading />
          ) : (
            // After it finishes loading if there is no data, it renders <NotFound />
            <NotFound />
          )}
        </ul>
        {this.state.modalImg ? (
          <Modal
            src={modalImg}
            photosLength={photosLength}
            modalId={modalImgId}
            next={this.nextModal}
            prev={this.prevModal}
            closeBtn={this.closeModalBtn}
            close={this.closeModal}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(Gallery);
