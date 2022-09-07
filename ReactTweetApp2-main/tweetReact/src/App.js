import Title from "./components/Home/Title";
import {  Route, Routes } from "react-router-dom";
import Main from "../src/components/Home/Main";
import Home from "./components/Home/Home";
import AllTweets from"./components/Home/AllTweets";
import AllUsers from "./components/Home/AllUsers";
import Search from "./components/Home/Search";
import Forgot from "./components/Login/Forgot";

function App() {
  return (
    <div className="App">
      <h1>Tweet Application</h1>
      <div>
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/All" element={<AllTweets />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/search" element={<Search />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
