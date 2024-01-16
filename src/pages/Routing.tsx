import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Home";
import AddContact from "./AddContact";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
