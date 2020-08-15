import React, { useState, useContext } from "react";

import Footer from "./Footer";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    authContext.setLogged(true);
    localStorage.setItem("reconmap-logged", "true");
    setLoading(false);
    history.push("/dashboard");
  };
  return (
    <div className=" container flex w-full h-screen p-3 mx-auto flex-col ">
      <Header />
      <main role="main" className="flex flex-1 flex-col ">
        <div className="flex flex-col justify-center h-full items-center ">
          <h1 className="text-5xl font-bold mb-10">Login in</h1>
          <section className="flex flex-col w-full sm:w-1/2 max-w-md gap-2 ">
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              placeholder="Email address"
              required
              autoFocus
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              placeholder="Password"
              required
            />
            <div className="checkbox my-3">
              <input type="checkbox" value="remember-me" /> Remember me
            </div>
            <button
              onClick={handleLogin}
              to="dashboard"
              className="bg-blue-500"
            >
              {!loading ? "Sign in" : "Espere por favor"}
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
