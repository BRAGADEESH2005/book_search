import React, { useState, useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './bookDetails.css'; 

function BookDetails() {
  const { bookKey } = useParams();
  const [book, setBook] = useState(null);
  const [authorName, setAuthorName] = useState('Loading...');

  useEffect(() => {
    fetchBookDetails(bookKey);
  }, [bookKey]);

  const fetchBookDetails = (key) => {
    const apiUrl = `https://openlibrary.org/works/${key}.json`;

    axios.get(apiUrl).then(response => {
      setBook(response.data);

      if (response.data.authors && response.data.authors.length > 0) {
        const authorKey = response.data.authors[0].author.key;
        fetchAuthorName(authorKey);
      }
    }).catch(error => {
      console.error("Error fetching book details:", error);
    });
  };

  const fetchAuthorName = (authorKey) => {
    const authorApiUrl = `https://openlibrary.org${authorKey}.json`;

    axios.get(authorApiUrl).then(response => {
      setAuthorName(response.data.name);
    }).catch(error => {
      console.error("Error fetching author name:", error);
      setAuthorName('Unknown Author');
    });
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  const lastModifiedDate = new Date(book.last_modified.value);
  const formattedDate = lastModifiedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="book-details">
        <Link to="/">Back</Link>
        <h1>Book Details</h1>

      <h2 className="book-title">{book.title}</h2>
      <p className="author">Author: {authorName}</p>
      <p className="published">Last Modified: {formattedDate}</p>
    </div>
  );
}

export default BookDetails;
