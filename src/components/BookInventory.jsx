import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import BookBox from './BookBox';
import '../styles/BookInventory.css';

function BookInventory(props) {
  const [bookInventory, setBookInventory] = useState([]);
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
  // hook on selected user: populate the book inventory
  useEffect(() => {
    if (props.userId) {
      downloadBooks(props.userId);
    }
  }, [props.userId]);

  function addRandomBook() {
    if (!props.userId || props.userId === -1) {
      return;
    }
    fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `{ 
            allBooks {
              id
              title
            }
          }`}),
    }).then((data) => data.json())
        .then((jsonData) => {
          // console.log(JSON.stringify(jsonData));
          // We will take a random book out of the list and add it to the current user
          const allbookList = jsonData.data.allBooks;
          const randomIndex = Math.floor(Math.random()*allbookList.length);
          const newBookId = allbookList[randomIndex].id;
          if (bookInventory.map((book) => book.id).includes(newBookId)) {
            console.warn(`Book already in the inventory!`);
          } else {
            // Add the book to the user
            fetch('/graphql', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                query: `
                    mutation { 
                      addToInventory(
                        userId: ${Number(props.userId)}
                        bookId: ${Number(newBookId)}
                        status: "Available") {
                          userId
                          bookId
                      } 
                  }`}),
            }).then((data) => data.json()).then((afterInsertData) => {
              // console.log(`After new inventory: ${JSON.stringify(afterInsertData)}`);
              downloadBooks(props.userId);
            });
          }
        });
  }

  return (
    <div className="panel bookInventory">
      <div>
        <p> Book Inventory </p>
        <button onClick={addRandomBook}> Add A random book (MVP Version) </button>
      </div>
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
