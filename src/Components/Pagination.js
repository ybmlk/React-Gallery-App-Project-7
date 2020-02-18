import React, { Component } from 'react';

class Pagination extends Component {
  state = {
    pages: [1, 2, 3, 4, 5],
    currentPage: 1,
  };

  handleNext = () => {
    const lastPage = this.state.pages[4];
    if (this.state.currentPage === lastPage) {
      this.setState(prevState => {
        prevState.pages.shift();
        return { pages: prevState.pages };
      });
      this.setState(prevState => {
        prevState.pages.push(lastPage + 1);
        return { pages: prevState.pages };
      });
    }
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handlePrev = () => {
    const firstPage = this.state.pages[0];
    if (this.state.currentPage === firstPage && firstPage !== 1) {
      this.setState(prevState => {
        prevState.pages.pop();
        return { pages: prevState.pages };
      });
      this.setState(prevState => {
        prevState.pages.unshift(firstPage - 1);
        return { pages: prevState.pages };
      });
    }
    this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
  };

  setCurrentPage = e => {
    const newPage = parseInt(e.target.innerText);
    this.setState(() => ({ currentPage: newPage }));
  };

  render() {
    const { pages, currentPage } = this.state;
    return (
      <div className='pagination'>
        <ul>
          <li>
            <button
              className='greyButton prevButton'
              onClick={this.handlePrev}
              disabled={currentPage === 1 && true}
            >
              Previous
            </button>
          </li>
          {pages.map((page, i) => {
            return (
              <li key={i}>
                <button
                  className={currentPage === page ? 'greyButton active' : 'greyButton'}
                  onClick={this.setCurrentPage}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li>
            <button className='greyButton nextButton' onClick={this.handleNext}>
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
