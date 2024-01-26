import { Profile } from "../model/profile.js";
import { User } from "../model/user.js";
import { hashPassword } from "../utils/utils.js";
import { errorResponse } from "../utils/response.js";
import { configAuth } from "../../config.js";
import jwt from "jsonwebtoken";

export class UserRepository {
  async register(data) {
    const newData = {
      ...data,
      password: (await hashPassword(data.password)).toString(),
    };
    try {
      const newUser = await User.create(newData);
      return newUser;
    } catch (error) {
      console.error(`[Failed to register new user] => ${error}`);
      return errorResponse(error.message);
    }
  }

  async login(data) {
    try {
      const userByEmail = await this.getUserByEmail(data.email);
      const userByUsername = await this.getUserByUsername(data.username);

      const user = userByEmail ?? userByUsername;

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        configAuth.secretKey,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: "1h", // 24 hours
        }
      );
      const dataRes = {
        id: user.id,
        // email: user.email,
        // username: user.username,
        token: token,
      };
      return dataRes;
    } catch (error) {
      console.error(`[Failed to login user] => ${error}`);
      return errorResponse(error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      const newUser = await User.findOne({ email: email });
      return newUser;
    } catch (error) {
      console.error(`[Failed to get user] => ${error}`);
      // return errorResponse(error.message);
      return;
    }
  }

  async getUserByUsername(username) {
    try {
      const newUser = await User.findOne({ username: username });
      return newUser;
    } catch (error) {
      console.error(`[Failed to get user] => ${error}`);
      // return errorResponse(error.message);
      return;
    }
  }

  async getAllUser() {
    try {
      const newUser = await User.find({});
      console.log(newUser);
      return newUser;
    } catch (error) {
      console.error(`[Failed to load list user] => ${error}`);
      return errorResponse(error.message);
    }
  }

  async createProfile(data) {
    try {
      const newUser = await Profile.create(data);
      return newUser;
    } catch (error) {
      console.error(`[Failed to create user profile] => ${error}`);
      return errorResponse(error.message);
    }
  }

  async getAllProfile() {
    try {
      const newUser = await Profile.find({});
      return newUser;
    } catch (error) {
      console.error(`[Failed to load list user profile] => ${error}`);
      return errorResponse(error.message);
    }
  }

  async getProfile(id) {
    try {
      const newUser = await Profile.findById(id);
      return newUser;
    } catch (error) {
      console.error(`[Failed to load user profile] => ${error}`);
      return errorResponse(error.message);
    }
  }

  async updateProfile(id, data) {
    try {
      const updateUer = await Profile.findOneAndUpdate({ userId: id }, data, {
        new: true,
      });
      if (updateUer == null) {
        const newData = {
          userId: id,
          ...data,
        };
        const newUser = this.createProfile(newData);
        return newUser;
      }
      return updateUer;
    } catch (error) {
      console.error(`[Failed to update user profile] => ${error}`);
      return errorResponse(error.message);
    }
  }

  async deleteProfile(id) {
    try {
      const newUser = await Profile.findOneAndDelete({ userId: id });
      if (newUser == null) {
        return errorResponse("Data is no longer available");
      }
      return newUser;
    } catch (error) {
      console.error(`[Failed to delete user profile] => ${error}`);
      return errorResponse(error.message);
    }
  }
}

export const userRepository = new UserRepository();
