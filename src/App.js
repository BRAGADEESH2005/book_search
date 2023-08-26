import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookFeed from './components/bookFeed/bookFeed';
import BookDetails from './components/bookDetails/bookDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<BookFeed/>} />
          <Route path="/works/:bookKey" element={<BookDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
