import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from './components/Products';
import Nav from './components/Nav';
import Boxes from './components/Boxes';
import Box from './components/Box';
import SearchProduct from './components/SearchProduct';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Products/>} />
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/boxes/:id" element={<Box />} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
