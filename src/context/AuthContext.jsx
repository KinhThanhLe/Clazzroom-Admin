import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [redirect, setRedirect] = useState(null);

  function login(loginData) {
    localStorage.setItem("token", loginData.token);
    setToken(loginData.token);
    setUser(loginData.user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentClass");
    setToken(null);
    setUser(null);
  }

  useLayoutEffect(() => {
    if (!token) return;

    axios
      .get("/users/profile", {})
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, setUser, user, token, redirect, setRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
