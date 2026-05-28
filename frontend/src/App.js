import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route, useLocation } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Routes from "./routes/Routes";

function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/register" || location.pathname === "/";

  return (
    <>
      {!hideLayout && <Header />}

      <Routes />

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Route render={() => <AppContent />} />
    </BrowserRouter>
  );
}

export default App;
