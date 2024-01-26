import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configAuth } from "../../config.js";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // console.log(hashedPassword);
  return hashedPassword;
};

export const checkPassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  // console.log(match ? "Passwords match" : "Passwords do not match");
  return match;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, configAuth.secretKey);
    req.userData = decoded;
    // console.log(req);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};

export const createToken = (data) => {
  const token = jwt.sign(data, configAuth.secretKey, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "1h", // 24 hours
  });
  return token;
};

export const decodedToken = (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, configAuth.secretKey);
    return decoded;
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};
