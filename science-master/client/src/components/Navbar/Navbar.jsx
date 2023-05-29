import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Logo from "../../img/logo.png"
import { AuthContext } from '../../context/authContext'
import './navbar.scss'

const Navbar = () => {
//to={`/profile/${currentUser.id}`}
  const {currentUser, logout} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=it">
            <h6>IT</h6>
          </Link>
          <Link className='link' to="/?cat=medicine">
            <h6>Health</h6>
          </Link>
          <Link className='link' to="/?cat=environment">
            <h6>Environment</h6>
          </Link>
          <Link className='link' to="/?cat=social">
            <h6>Social</h6>
          </Link>
          <Link className='link' to="/?cat=history">
            <h6>History</h6>
          </Link>
          <Link className='link' to="/?cat=finance">
            <h6>Finance</h6>
          </Link>
          <Link className='link' to={`/profile/${currentUser?.id}`}>{currentUser?.username}</Link> 
          {currentUser? (
          <span onClick={logout}>Logout</span> 
          ) :(
            <Link className='link' to="/login">
              Login
            </Link>
          )}
          <span className='write'>
            <Link className='link' to="/write">Add</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
