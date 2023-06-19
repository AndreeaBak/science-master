import React from 'react'
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import './register.scss'
import 'font-awesome/css/font-awesome.min.css';
import Logo from "../../img/logo.png"

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

const handleChange = (e) => {
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}

const handleSubmit = async (e) => { //este async pt ca asteptam pt un request api 
  e.preventDefault() //ca sa evitam sa se dea refresh la pagina cand apasam butonul
  try {
    await axios.post("/auth/register", inputs)
    navigate("/login")
  } catch(err){
    setError(err.response.data)
  }
  
}

  return (
    <div className="containerLogin">
      <div className="screen">
        <div className="screen__content">
          <h1 className='login-title'>Register</h1>
          <form className="login">
            
            <div className="login__field">
              <i className="login__icon fa fa-user"></i>
              <input type="text" className="login__input" placeholder="Username" name="username" onChange={handleChange} />
            </div>
            <div className="login__field">
              <i className="login__icon fa fa-envelope"></i>
              <input type="text" className="login__input" placeholder="Email" name="email" onChange={handleChange} />
            </div>
            <div className="login__field">
              <i className="login__icon fa fa-lock"></i>
              <input type="password" className="login__input" placeholder="Password" name="password" onChange={handleChange} />
            </div>
            <button className="button login__submit" onClick={handleSubmit}>
              <span className="button__text" >Register now</span>
              <i className="button__icon fa fa-chevron-right"></i>
            </button>
            {err && <p className='error'>{err}</p>}
            <span className='to_register'>Already have an account? <Link className='link' to="/login">Login</Link></span>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  )
}

export default Register;
