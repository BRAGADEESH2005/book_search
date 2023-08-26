import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import "./bookFeed.css";

function BookFeed() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("title");
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false); // Define noResults state
  const visiblePages = 5; // Number of visible page buttons

  const booksPerPage = 10;

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = async (page) => {
    setLoading(true);
    setError(null);
    setNoResults(false);
  
    let apiUrl;
    console.log("serch $ qusetr",isSearch,searchQuery)

    if (isSearch && searchQuery !== "" ){
      console.log(filterType,searchQuery)
      apiUrl=`https://openlibrary.org/search.json?${filterType}=${searchQuery}`
    }else{
     apiUrl = `https://openlibrary.org/search.json?q=query&page=${page}&limit=${booksPerPage}`;
    }
    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data.docs);
      setTotalBooks(response.data.num_found);
      setTotalPages(Math.ceil(response.data.num_found / booksPerPage));
      setLoading(false);

      if (response.data.docs.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
      setError("An error occurred while fetching books. Please try again later.");
    }
  };
  
  const onPageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
    fetchBooks(pageNumber);
  };

  const totalPagesArray = () => {
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftVisiblePages = Math.floor((visiblePages - 2) / 2);
    const rightVisiblePages = visiblePages - leftVisiblePages - 1;

    let startPage = Math.max(currentPage - leftVisiblePages, 1);
    let endPage = Math.min(currentPage + rightVisiblePages, totalPages);

    if (startPage === 1) {
      endPage = Math.min(endPage + (leftVisiblePages - 1), totalPages);
    }
    if (endPage === totalPages) {
      startPage = Math.max(startPage - (rightVisiblePages - 1), 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  useEffect(() => {
    fetchBooks();
  }, [isSearch]);

  const handleSearch = () => {
    if (searchQuery !== "") {
      fetchBooks();
      setIsSearch(true);
    }
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="book-feed">
      <Navbar />
      <div className="filter">
        <select value={filterType} onChange={handleFilterChange}>
          <option value="author">Author Name</option>
          <option value="title">Book Name</option>
        </select>
      </div>
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : noResults ? (
          <p>No books found.</p>
        ) : (
          books.map(book => (
            <li key={book.key}>
              <Link to={book.key} className="book-link">
                <p>Title: {book.title}</p>
                <p>Author: {book.author_name}</p>
              </Link>
            </li>
          ))
        )}
      </ul>

      <div className="pagination">
        <button
          className={`page-number ${1 === currentPage ? 'active' : ''}`}
          onClick={() => onPageClick(1)}
        >
          1
        </button>
        {currentPage > 3 && <span className="dots">...</span>}
        {totalPagesArray().map((pageNumber, index) => (
          <button
            key={index}
            className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages - 2 && <span className="dots">...</span>}
        <button
          className={`page-number ${totalPages === currentPage ? 'active' : ''}`}
          onClick={() => onPageClick(totalPages)}
        >
          {totalPages}
        </button>
      </div>
    </div>
  );
}

export default BookFeed;