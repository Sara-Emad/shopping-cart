import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Store from "./components/Store";
import Navbar from "./components/Navbar";
import ShoppingCartProvider from "./context/ShoppingCartContext"

const App = () => {
  return (
  
  
  <ShoppingCartProvider>
        <Navbar/>
        <Container className="mb-4">
          <Routes>
          <Route path="/" element={<Store />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          
          </Routes>
        </Container>
  </ShoppingCartProvider>
  
    
  );
};

export default App;
