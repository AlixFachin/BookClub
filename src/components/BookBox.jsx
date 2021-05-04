import React from 'react';
import PropTypes from 'prop-types';
import '../styles/BookBox.css';

function BookBox(props) {
  return (<div className="miniPanel bookBox">
    <span className="booktitle">{props.book.title}</span>
            ({props.book.author})
    <div className="bookButtonsDiv">
      <button className="bookButton">EDIT</button>
      <button className="bookButton">CHAT</button>
    </div>
  </div>);
}

BookBox.propTypes = {
  book: PropTypes.object,
};

export default BookBox;
