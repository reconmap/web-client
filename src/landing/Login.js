import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Wrap from "./Wrap";

const Login = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('username', document.getElementById('inputUsername').value);
    formData.append('password', document.getElementById('inputPassword').value);
    fetch('http://localhost:8080/users', {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if(response.status !== 200) {
          throw new Error('Invalid credentials');
        }
        return response.json();
      })
      .then((data) => {
        authContext.setLogged(true);
        localStorage.setItem("reconmap-logged", "true");
        localStorage.setItem("accessToken", data.access_token);
    
        setLoading(false);
        history.push("/dashboard");    
      })
      .catch(function(err) {
          setLoading(false);
          alert(err);
      })
      .finally(function() {
      });
  };
  return (
    <Wrap>
      <div className='flex justify-between items-center  w-full flex-col md:flex-row' >

          <section className="flex flex-col w-full sm:w-1/2 max-w-lg gap-2 ">
          <h1 className="text-5xl font-bold mb-10">Login</h1>
            <label htmlFor="inputUsername" className="sr-only">
              Username
            </label>
            <input type="text" id="inputUsername" placeholder="Username" required autoFocus />
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
