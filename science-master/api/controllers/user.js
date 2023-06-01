import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving user." });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  console.log("req.body:", req.body);
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    let q = "UPDATE users SET";
    const params = [];
    if (req.body.username) {
      q += " `username`=?,";
      params.push(req.body.username);
    }
    if (req.body.email) {
      q += " `email`=?,";
      params.push(req.body.email);
    }
    if (req.body.img) {
      q += " `img`=?,";
      params.push(req.body.img);
    }
    q = q.slice(0, -1) + " WHERE id=? ";
    params.push(userInfo.id);

    db.query(q, params, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    });
  });
};

