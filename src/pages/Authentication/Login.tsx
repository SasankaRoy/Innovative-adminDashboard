import { useState, useEffect } from 'react'
import { logIn, verifyToken } from '../../api-calls/apicalls';
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logo-dark.png"
import darkBg from "../../assets/dark_pattern.png"
import "../../css/login.css"

function Login() {
  const [showNotFound, setShowNotFound] = useState<boolean | undefined>(undefined)
  const [password, setPassword] = useState<string>()
  const [email, setEmail] = useState<string>()

  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = await logIn({ email: email, password: password })
    // console.log("+++",loginData)
    if (loginData.success == "no") {
      alert(loginData?.message)
    } else if (loginData.success == "yes") {
      // console.log("login successfull")
      // setLoginValidity(true)
      localStorage.setItem("token", loginData.token)
      navigate("/dashboard");
    }
  }

  useEffect(() => {


    const verifier = async () => {

      if (localStorage.getItem("token")) {
        const verifiedTokenData = await verifyToken()
        // console.log("rrr",verifiedTokenData?.message)
        if (verifiedTokenData?.message == "jwt expired") {
          setShowNotFound(false)
        } else {
          setShowNotFound(true)
        }
      } else {
        setShowNotFound(false)
      }
    }

    verifier()

  }, []);

  if (showNotFound === true) {
    return (
      <div className='flex justify-center'>
        You are already logged in, go to&nbsp;<a href="/dashboard">dashboard</a>
      </div>
    );
  } else if (showNotFound === false) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${darkBg})`, backgroundSize: "cover" }}>
        <div className='admin__login_container'>
          <div className="flex justify-center mt-3">
            <img alt="dark-logo" src={logoDark} className='w-25 h-25' />
          </div>
          <h2 className="text-center mt-3 text-white">Admin Login</h2>
          <div className='flex flex-col'>
            <div className="mt-5 mb-3 flex justify-center">
              <input
                type="email"
                className='rounded'
                placeholder='Enter email'
                id="email"
                name="email"
                value={email}
                autoComplete="off"
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>
            <div className="mt-3 mb-3 flex justify-center ">
              <input
                type="text"
                className='rounded'
                placeholder='Enter password'
                id="password"
                name="password"
                value={password}
                autoComplete="off"
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>
            <div className='mt-3 mb-5 flex justify-center '>
              <button
                className="bg-cyan-500 hover:bg-cyan-600 w-25 rounded text-white"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Login