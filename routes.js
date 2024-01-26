import express from "express";
import { userController } from "./src/controller/user.js";
import { loginValidation, registerValidation } from "./src/utils/validation.js";
import { verifyToken } from "./src/utils/utils.js";

//initiating the router
export const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/getAllUser", verifyToken, userController.getAllUser);
router.post("/createProfile", verifyToken, userController.createProfile);
router.get("/getAllProfile", verifyToken, userController.getAllProfile);
router.get("/getProfile/:id", verifyToken, userController.getProfile);
router.put("/updateProfile/:id", verifyToken, userController.updateProfile);
router.delete("/deleteProfile/:id", verifyToken, userController.deleteProfile);
