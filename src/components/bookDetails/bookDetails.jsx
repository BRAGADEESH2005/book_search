import React, { useState, useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './bookDetails.css'; 
import Navbar from '../navbar/navbar';

function BookDetails() {
  const { bookKey } = useParams();
  const [book, setBook] = useState(null);
  const [authorName, setAuthorName] = useState('Loading...');

  useEffect(() => {
    fetchBookDetails(bookKey);
  }, [bookKey]);

  const fetchBookDetails = (key) => {
    const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${key}&jscmd=details&format=json`;

    axios.get(apiUrl).then(response => {
      // console.log(response.data)
      console.log("Full data---",response.data[`ISBN:${key}`]);
      setBook(response.data[`ISBN:${key}`]);
     
 
    }).catch(error => {
      console.error("Error fetching book details:", error);
    });
  };

  // const fetchAuthorName = (authorKey) => {
  //   const authorApiUrl = `https://openlibrary.org${authorKey}.json`;

  //   axios.get(authorApiUrl).then(response => {
  //     setAuthorName(response.data.name);
  //   }).catch(error => {
  //     console.error("Error fetching author name:", error);
  //     setAuthorName('Unknown Author');
  //   });
  // };

  if (!book) {
    return <div>Loading...</div>;
  }

  // const lastModifiedDate = new Date(book.last_modified.value);
  // const formattedDate = lastModifiedDate.toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  return (
    <div className="book-details">

          <Navbar />
        <Link to="/">Back</Link>
        <h1>Book Details</h1>
{console.log("book ", book)}

    <p><b>Title:</b> {book.details.title}</p>
    <p><b>Subtitile:</b>{book.details.subtitle}</p>
    <b>Author Name(s)</b>
    {book.details.authors.map((author,index)=>{
     return( <p key={index}> {author.name}</p>)
    })}
    <p><b>Publish Date:</b>{book.details.publish_date}</p>  
    <p><b>Number Of pages:</b>{book.details.pagination}</p>
    <b>Publisher(s)</b>
    {book.details.publishers.map((publisher,index)=>{
     return( <p key={index}> {publisher}</p>)
    })}
    <p><b>Revision:</b>{book.details.revision}</p>
    <p><b>Info URL:</b><a href={book.info_url} target='_blank'>Click Here</a></p>
  </div>
  );
}

export default BookDetails;

//details.number_of_pages
//details.table_of_contents
//title
//description
//publish_date
//authors.map(auther) author.name
