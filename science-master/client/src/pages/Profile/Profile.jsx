import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./profile.scss";

const Profile = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    img: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      img: inputs.img,
    };
    try {
      await updateCurrentUser(data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Actualizează starea locală atunci când se schimbă starea utilizatorului în context
  useEffect(() => {
    setInputs({
      username: currentUser.username,
      email: currentUser.email,
      password: "",
      img: null,
    });
  }, [currentUser]);

  return (
    <div className="profile">
      <h1>Update Profile</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Update</button>
      </form>
    </div>
  );
};

export default Profile;
