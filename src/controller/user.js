import { profileSchemaValidate } from "../model/profile.js";
import { loginSchemaValidate, userSchemaValidate } from "../model/user.js";
import { userRepository } from "../repository/user.js";
import { errorResponse } from "../utils/response.js";
import { checkPassword, createToken, decodedToken } from "../utils/utils.js";

class UserController {
  login = async (req, res) => {
    const data = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const { error, value } = loginSchemaValidate.validate(data);
    if (error) {
      return res.send(errorResponse(error.message));
    }

    const isUser = await userRepository.getUserByEmail(data.email);
    const userByUsername = await userRepository.getUserByUsername(
      data.username
    );

    if (userByUsername == null && isUser == null) {
      return res.send(errorResponse("User no longer exists"));
    }

    const password = isUser ? isUser.password : userByUsername.password;

    if (!checkPassword(data.password, password)) {
      return res.send(errorResponse("Email or password incorrect"));
    }

    const user = await userRepository.login(value);
    res.status(200).send(user);
  };

  register = async (req, res) => {
    const data = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const { error, value } = userSchemaValidate.validate(data);
    if (error) {
      return res.send(errorResponse(error.message));
    }

    const user = await userRepository.getUserByEmail(data.email);
    if (user) {
      return res.send(errorResponse("User already exists"));
    }

    const newUser = await userRepository.register(value);
    res.status(201).send(newUser);
  };

  getAllUser = async (req, res) => {
    const user = await userRepository.getAllUser();
    res.send(user);
  };

  createProfile = async (req, res) => {
    const token = decodedToken(req, res);
    const data = {
      userId: token.id,
      name: req.body.name,
      gender: req.body.gender,
      birthday: req.body.birthday,
      horoscope: req.body.horoscope,
      zodiac: req.body.zodiac,
      height: req.body.height,
      weight: req.body.weight,
      interest: req.body.interest,
      image: req.body.image,
    };

    const { error, value } = profileSchemaValidate.validate(data);
    if (error) {
      return res.send(errorResponse(error.message));
    }

    const user = await userRepository.createProfile(value);
    res.status(201).send(user);
  };

  getAllProfile = async (req, res) => {
    // const extractToken = decodedToken(req, res);
    // console.log(extractToken);
    const user = await userRepository.getAllProfile();
    res.send(user);
  };

  getProfile = async (req, res) => {
    const id = req.params.id;
    const user = await userRepository.getProfile(id);
    res.send(user);
  };

  updateProfile = async (req, res) => {
    const id = req.params.id;
    const user = await userRepository.updateProfile(id, req.body);
    res.send(user);
  };

  deleteProfile = async (req, res) => {
    const id = req.params.id;
    const user = await userRepository.deleteProfile(id);
    res.send(user);
  };
}

//export class
export const userController = new UserController();
