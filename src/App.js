import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import HomeRoute from "./routes/Home/HomeRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
