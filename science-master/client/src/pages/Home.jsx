import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [cat])

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [posts, searchQuery])

  const handleSearch = event => {
    setSearchQuery(event.target.value)
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className='search-bar'>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Caută...'
        />
      </div>
      <div className="posts">
        {(searchQuery ? filteredPosts : posts).map(post =>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`./upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <a href={`/post/${post.id}`} className='button'>Read More</a>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Home;
