import React, { Component } from 'react';

class Pagination extends Component {
  state = {
    pageStart: 1,
  };

  handleNext = () => {
    this.setState(prevState => ({ pageStart: prevState.pageStart + 1 }));
  };
  render() {
    const arr = [1, 2, 3, 4, 5];
    const { pageStart } = this.state;
    console.log(pageStart);
    return (
      <div className='pagination'>
        <ul>
          <li>
            <button className='greyButton prevButton'> Previous </button>
          </li>
          {arr.map((num, i) => {
            const pageNum = i + pageStart;
            return (
              <li key={i}>
                <button className='greyButton'>{pageNum}</button>
              </li>
            );
          })}
          <li>
            <button className='greyButton nextButton' onClick={this.handleNext}>
              {' '}
              Next{' '}
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
