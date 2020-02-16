import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const arr = [1, 2, 3, 4, 5];
    return (
      <div className='pagination'>
        <ul>
          <li>
            <button className='greyButton prevButton'> Previous </button>
          </li>
          {arr.map((num, i) => {
            const pageNum = i + 1;
            return (
              <li>
                <button className='greyButton'>{pageNum}</button>
              </li>
            );
          })}
          <li>
            <button className='greyButton nextButton'> Next </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
