import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutLuxyStore from "./components/AboutLuxyStore/AboutLuxyStore"; // Đường dẫn chính xác
import Home from "./pages/Home"; // Trang chính

function App() {
  const routeElements = useRouteElements()
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-luxystore" element={<AboutLuxyStore />} />
      </Routes>
    </Router>
  );
}

export default App
