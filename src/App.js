import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext"
import { useContext } from "react";

import MainLayout from "./components/MainLayout";

import Classes from "./pages/Classes";

import Accountlist from "./pages/Accountlist";
import LoginPage from "./pages/LoginPage";
import Addaccount from "./pages/Addaccount";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="admin" /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={token ? <Navigate to="/admin" /> : <LoginPage />}></Route>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Classes />} />
          <Route path="list-account" element={<Accountlist />} />
          <Route path="account" element={<Addaccount />} />
          <Route path="classes" element={<Classes />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
