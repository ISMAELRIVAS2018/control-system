import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const baseUrl = "https://127.0.0.1:49160/api/auth/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const response = await axios.post(
        baseUrl,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      alert("login successfully");
      // navigate("/");
    } catch (error) {
      setErro(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <>
      {erro && <p className="text-white">{erro}</p>}

   
      <div className="container mx-auto px-8 h-3/6 box-content md:h-32 w-32 p-4 border-4  justify-center ">
      <div className="auth-wrapper ">
          <div className="auth-content ">
            <div className="auth-bg  ">
              <span className="r"></span>
              <span className="r s"></span>
              <span className="r s"></span>
              <span className="r"></span>
            </div>
          </div>
        </div>

        {/* //---------FELX ALINIAR EN EL CONTENEDOR ----// */}
        <div className="flex content-center items-center justify-center h-1/2 justify-statr  p-1 shadow-lg rounded-lg  border-0 ">
        
              {/* // ----LOGIN------// */}
          <div className="w-full lg:w-4/12 px-4">
            {/* // -------CONTENEDOR FLEX CENTER ------// */}
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6   ">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold"></h6>
                  <img
                    alt="..."
                    className="w-1/2 mr-1 cart "
                    src={require("assets/img/conexion.jpg").default}
                  />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-yellow-300 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                {/* //-------CONTENEDOR DE REGISTRP Y RECUPERACION DE CLAVE----// */}
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-blueGray-200"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/auth/register" className="text-blueGray-200">
                      <small>Create new account</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* //-------CONTENEDOR DE REGISTRP Y RECUPERACION DE CLAVE----// */}
          </div>
          <div className="w-4/5 md:w-full flex items-center">
            <img
              alt="..."
              className="object-cover w-full  hidden md:block dibujo1  "
              src={require("assets/img/dibujo.jpg").default}
            />
          </div>
        </div>
      </div>
    </>
  );
}
