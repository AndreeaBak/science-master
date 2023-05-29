import React, { useContext } from 'react'
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import './login.scss'

const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  })

const [err, setError] = useState(null)

const navigate = useNavigate()

const {login} = useContext(AuthContext);

const handleChange = (e) => {
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}

const handleSubmit = async (e) => { //este async pt ca asteptam pt un request api 
  e.preventDefault() //ca sa evitam sa se dea refresh la pagina cand apasam butonul
  try {
    await login(inputs)
    navigate("/")
  } catch(err){
    setError(err.response.data)
  }
  
}
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type='text' placeholder='username' name="username" onChange={handleChange}/>
        <input type='password' placeholder='password' name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p> }
        <span>Don't you have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login;