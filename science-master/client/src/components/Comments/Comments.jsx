import { useState, useContext, useEffect } from "react";
import axios from 'axios'
import moment from "moment";
import { AuthContext } from '../../context/authContext'

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    axios
      .get("/comments?postId=" + postId)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);

  const handleClick = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    axios
      .post("/comments", { desc, postId })
      .then(() => {
        setDesc("");
        axios.get("/comments?postId=" + postId).then((res) => {
          setComments(res.data);
        });
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/comments/${id}`);
      setComments(comments.filter(comment => comment.id !== id)); // remove the deleted comment from the comments state
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="comments">
      <div className="write">
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
      {error ? (
        <div className="error">{error}</div>
      ) : isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="info">
              <span>{comment.username}</span>
              {currentUser.username === comment.username &&
              <button className="delete-button" onClick={() => handleDelete(comment.id)}>X</button> 
              }
              <p>{comment.desc}</p>
              </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;