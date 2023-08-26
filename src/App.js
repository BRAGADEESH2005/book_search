import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookFeed from './components/bookFeed/bookFeed';
import BookDetails from './components/bookDetails/bookDetails';
import AboutUs from './components/aboutUs/aboutUs';
import ContactUs from './components/contactUs/contactUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<BookFeed/>} />
          <Route path="/works/:bookKey" element={<BookDetails/>} />
          <Route  path='/about-us' element={<AboutUs/>}/>
          <Route  path='/contact-us' element={<ContactUs/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
