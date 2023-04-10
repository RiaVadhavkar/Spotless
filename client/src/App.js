import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Register from "./views/Register";
import List from "./views/List";
import Settings from "./views/Settings";
import Login from "./views/Login";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [sessionUsername, setSessionUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setSessionToken(token);
      setSessionUsername(username);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", sessionToken);
    localStorage.setItem("username", sessionUsername);
  }, [sessionToken, sessionUsername]);

  return (
    // TODO: add class="font-default" to App
    <div className="App" class="h-screen">
      <SessionContext.Provider value={{ sessionToken, setSessionToken, sessionUsername, setSessionUsername }}>
      <Header></Header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list" element={<List />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Footer></Footer>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
