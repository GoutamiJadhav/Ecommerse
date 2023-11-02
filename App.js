import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Auth from "./Auth";
import ProductListing from "./Productlisting";
import Login1 from "./Login1"

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
   
    <Route path="/" element={<Login1 />} />
    <Route path="/product" element={<ProductListing />} />
</Routes>
</BrowserRouter>
  )
}

export default App;
