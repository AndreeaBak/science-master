import React, { useContext, useEffect, useState, createRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Edit from '../../img/edit.png';
import Delete from '../../img/delete.png';
import Menu from '../../components/Menu/Menu.jsx';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../context/authContext';
import Comments from '../../components/Comments/Comments';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DOMPurify from 'dompurify';
import html2canvas from 'html2canvas';
import './article.scss'

const Article = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const contentRef = createRef();

  const generatePDF = async () => {
  const doc = new jsPDF('portrait', 'pt', 'a4');
  const content = contentRef.current;


  const canvas = await html2canvas(content, {
    scrollY: -window.scrollY,
    useCORS: true,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
    scale: 1,
  });

  const imgData = canvas.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', 20, 30);
  
  const pageCount = Math.ceil(canvas.height / doc.internal.pageSize.getHeight()) - 1;

  for (let i = 1; i < pageCount; i++) {
    
    doc.addPage();
    doc.addImage(imgData, 'PNG', 20, -(i * doc.internal.pageSize.getHeight()) + 20);
  }

  doc.save('Articol.pdf');
};


  return (
    <div className='article'>
      <div className="content" ref={contentRef}>
        <img src={`../upload/${post?.img}`} alt=""></img>
        <div className="user">
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>
        <button className="generatePDF" onClick={generatePDF} >Salvează ca fişier PDF</button>
        <Comments postId={post.id}></Comments>
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Article;
