import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import Headers from "./Components/Headers";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import { Routes, Route } from "react-router-dom";
import Test from "./Components/Test";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dk" element={<Test />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/user/:userId" element={<UserProfile/>} />
      </Routes>
    </>
  );
}

export default App;
