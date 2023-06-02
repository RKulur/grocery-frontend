import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Features from './components/Features';
import Products from './components/Products';
import Categories from './components/Categories';
import Reviews from './components/Reviews';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import { BrowserRouter as Router,Routes , Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={
            <>
            <Header />
            <Banner />
            <Features />
            <Products />
            <Categories />
            <Reviews />
            <Blogs />
            <Footer />
            </>
          } />
        </Routes>
      </Router>
      
      
      
      
      
      
      
    </div>
  );
}

export default App;
