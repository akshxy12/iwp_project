import {BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";
// Styles
import './App.css';

// Components
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Login from './components/Login/Login';
import Signup from "./components/Signup/Signup";
import Createplan from "./components/Createplan/Createplan";
import Home from "./components/Home/Home";
import SpendingRecord from "./components/SpendingRecord/SpendingRecord";
import Errorpage from "./components/Errorpage/Errorpage";

function App() {
  return (
    <div className="App">
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/createplan/:username" element={<Createplan />} />
          <Route path="/addspendingrecord/:username" element={<SpendingRecord />} />
          <Route path="/home/:username" element={<Home />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
