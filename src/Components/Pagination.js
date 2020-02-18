import React, { Component } from 'react';

class Pagination extends Component {
  constructor({ context }) {
    super();
    this.search = context.action.search;
    this.incrementPage = context.action.incrementPage;
    this.decrementPage = context.action.decrementPage;
    this.setCurrentPage = context.action.setCurrentPage;
  }

  state = {
    pages: [1, 2, 3, 4, 5],
    currentPage: 1,
  };

  // When there's change in 'currentPage' state 'this.search()' is called
  componentDidUpdate(prevProps, prevState) {
    const query = this.props.context.state.title;
    if (prevState.currentPage !== this.state.currentPage) {
      this.search(query);
    }
  }

  /* If the 'currenPage' in context is d/t from the 'currentPage'  
  in this component, it will update this state to match the context */
  static getDerivedStateFromProps(nextProps, prevState) {
    const contextCurrentPage = nextProps.context.state.currentPage;
    if (prevState.currentPage !== contextCurrentPage) {
      return { currentPage: contextCurrentPage };
    }
    return null;
  }

  handleNext = () => {
    // 'lastPage' refers to the last page of the 5 pages shown
    const lastPage = this.state.pages[4];
    // If the 'last page' is active when 'next' is clicked...
    if (this.state.currentPage === lastPage) {
      // Remove the first page of the 5 pages shown
      this.setState(prevState => {
        prevState.pages.shift();
        return { pages: prevState.pages };
      });
      // Append the next page behind 'last page'
      this.setState(prevState => {
        prevState.pages.push(lastPage + 1);
        return { pages: prevState.pages };
      });
    }
    // Increases the 'currentPage' inside context by 1
    this.incrementPage();
  };

  handlePrev = () => {
    // 'firstPage' refers to the first page of the 5 pages shown
    const firstPage = this.state.pages[0];
    // If the 'first page' is active when 'previous' is clicked...
    if (this.state.currentPage === firstPage && firstPage !== 1) {
      // Remove the last page of the 5 pages shown
      this.setState(prevState => {
        prevState.pages.pop();
        return { pages: prevState.pages };
      });
      // Append the previous page infront of 'first page'
      this.setState(prevState => {
        prevState.pages.unshift(firstPage - 1);
        return { pages: prevState.pages };
      });
    }
    // Decreases the 'currentPage' inside context by 1
    this.decrementPage();
  };

  // Make the cliked page active
  clickCurrentPage = e => {
    const newPage = parseInt(e.target.innerText);
    this.setCurrentPage(newPage);
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
                  onClick={this.clickCurrentPage}
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
