import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `profilePic`=?,`coverPic`=? WHERE id=? ";

    db.query(
      q,
      [
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};

export const searchUser = (req, res) => {
  const username = req.params.username;
  const q = "SELECT * FROM users WHERE username LIKE ?";

  // Wrap the username with '%' for partial matching
  const searchUsername = `%${username}%`;

  db.query(q, [searchUsername], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      // If no matching user is found, return a 404 status code
      return res.status(404).json("User not found");
    }

    // If a user with the specified username is found, return their information
    const { password, ...userInfo } = data[0];
    return res.json(userInfo);
  });
  
};


