import React, { useState, useContext } from "react";

import Footer from "./Footer";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Wrap from "./Wrap";

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
    <Wrap>
      <div className='flex justify-between items-center  w-full flex-col md:flex-row' >

          <section className="flex flex-col w-full sm:w-1/2 max-w-lg gap-2 ">
          <h1 className="text-5xl font-bold mb-10">Login</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input type="email" id="inputEmail" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input type="password" id="inputPassword" placeholder="Password" required />
            <button onClick={handleLogin} to="dashboard" >
              {!loading ? "Sign in" : "Espere por favor"}
            </button>
            <div className="checkbox my-3 text-gray-500">
              <input type="checkbox" value="remember-me" /> Remember me
            </div>
          </section>
        <i className='fa fa-lock fa-10x text-gray-800 order-1 md:order-3 p-5 hidden md:inline' />
        </div>

        </Wrap>
  );
};

export default Login;
