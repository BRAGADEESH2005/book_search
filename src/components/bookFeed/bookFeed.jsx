import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import "./bookFeed.css"
function BookFeed() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("author");
  const [isSearch,setisSearch]=useState(false);
  const [loading,setLoading]=useState(true);

  const booksPerPage = 10;

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = (page) => {
    setLoading(true);
    let apiUrl;
    if (isSearch ){
      console.log(filterType,searchQuery)
      apiUrl=`https://openlibrary.org/search.json?${filterType}=${searchQuery}`
    }else{
     apiUrl = `https://openlibrary.org/search.json?q=query&page=${page}&limit=${booksPerPage}`;
    }
    axios.get(apiUrl).then(response => {
      setBooks(response.data.docs);
      setTotalBooks(response.data.numFound);
      setTotalPages(Math.ceil(response.data.numFound / booksPerPage));
      setLoading(false);
      console.log("set loading to false...")
    }).catch(error => {
      console.error("Error fetching books:", error);
    });
  };

  const onPageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; 
    }
    setCurrentPage(pageNumber);
    fetchBooks(pageNumber);
  };

  const totalPagesArray = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };
  useEffect(() => {
    fetchBooks();
  },[isSearch]);

  const handleSearch =()=>{
    if (isSearch && searchQuery !=="" ){
        fetchBooks();
      console.log("insidee ifff")
    }
    if(searchQuery !== ""){
    console.log("elseeee")
    setisSearch(true)}
    console.log("search clickedddd")
  }

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    console.log(event.target.value)
  };

  return (
    loading ?
    <p>Loading...</p>:(

    <div className="book-feed">
    <Navbar />
    <div className="filter">
        <select value={filterType} onChange={handleFilterChange}>
          <option value="author">Author Name</option>
          <option value="title">Book Name</option>
        </select>
      </div>
      {/* Search input and button */}
      <div className="search">
        <input
          type="text"
          placeholder="Search by title, author, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

<ul className="book-list">
        {books.map(book => (
          <li key={book.key}>
            <Link to={`${book.key}`} className="book-link">
              <p>Title: {book.title}</p>
              <p>Author: {book.author_name}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        {totalPagesArray().map((pageNumber, index) => (
          <button
            key={index}
            className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
    )
  );
}

export default BookFeed;
