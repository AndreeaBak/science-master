import React, { useState, useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../../context/authContext';
import './write.scss'

const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.desc ||'');
  const [content, setContent] = useState(state?.content || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const {currentUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const upload = async () => {
    try{
      const formData = new FormData()
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload()

    try{
      state 
      ? await axios.put(`/posts/${state.id}`, {
        title, 
        desc:value, 
        content,
        cat, 
        img: file ? imgUrl : ""
    }) :  await axios.post(`/posts/`, {
      title, 
      desc:value, 
      content,
      cat, 
      img: file ? imgUrl : "",
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    })
      navigate("/")
    } catch (err){
      console.log(err)
    }
  }

  if(currentUser) {
  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className="descEditorContainer">
          <ReactQuill className="descEditor" theme="snow" value={value} placeholder='Add description...' onChange={setValue} />
        </div>
        <div className="contentEditorContainer">
          <ReactQuill className="contentEditor" theme="snow" value={content}  placeholder='Add content...' onChange={setContent} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none" }} type="file" id="file" name="" onChange={e => setFile(e.target.files[0])}/>
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "it"} name="cat" value="it" id="it" onChange={e => setCat(e.target.value)} />
            <label htmlFor="it">IT</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "medicine"} name="cat" value="medicine" id="medicine" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="medicine">Health</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "environment"} name="cat" value="environment" id="environment" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="environment">Environment</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "social"} name="cat" value="social" id="social" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="social">Social</label>
          </div>
          <div className="cat">
            <input type="radio"checked={cat === "history"}  name="cat" value="history" id="history" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="history">History</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "finance"} name="cat" value="finance" id="finance" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="finance">Finance</label>
          </div>
        </div>
      </div>
    </div>
  )
  } else {
    return (
      <Navigate to="/unauthorized" /> 
    )

  }
}

export default Write;
