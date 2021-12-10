import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from './components/ProductList';
import Nav from './components/Nav';
import BoxList from './components/BoxList';
import Box from './components/Box';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/boxes" element={<BoxList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/boxes/:id" element={<Box />} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
