import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";

import Classes from "./pages/Classes";

import Accountlist from "./pages/Accountlist";

import Addaccount from "./pages/Addaccount";

function App() {
  return (
    <Router>
      <Routes>
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
