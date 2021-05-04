import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import BookBox from './BookBox';
import '../styles/BookInventory.css';

function BookInventory(props) {
  const [bookInventory, setBookInventory] = useState([]);
  // hook on selected user: populate the book inventory
  useEffect(() => {
    async function downloadBooks(userId) {
      const bookList = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          query: `{ 
            bookInventory(userId:${userId}) {
              id
              title
              author
              genre
              language
            }
          }`}),
      }).then((data) => data.json())
          .then((resultObj) => {
            return resultObj.data.bookInventory;
          });
      setBookInventory(bookList);
    }
    downloadBooks(props.userId);
  }, [props.userId]);
  return (
    <div className="panel bookInventory">
      <p> Book Inventory: </p>
      { bookInventory.map((book, index) => {
        return (<BookBox key={`book-${book.id}-${index}`} book={book} /> );
      })}
    </div>
  );
}

BookInventory.propTypes = {
  userId: PropTypes.number,
};

export default BookInventory;
