import express from "express";
const router = express.Router();

import {userSignup,userLogin} from "../controller/userController"
import controller from "../controller/blogController";
import auth from "../middleware/auth";
import userValidations from "../middleware/userValidations";
import validations from "../middleware/blogValidations";
router.post("/registration",userValidations,userSignup);
router.post("/userLogin",userLogin);
router.post("/createBlogs",auth.authenticateToken,validations.createBlogsValidations,controller.createBlogs);
router.get("/getBlogs", auth.authenticateToken,controller.getBlogs);
router.put("/updateBlog/:id", auth.authenticateToken,auth.authorization,validations.updateValidations,controller.updateBlog);
router.delete("/deleteBlog/:id", auth.authenticateToken,auth.authorization,controller.deleteBlog);
router.delete("/deleteBlogByFilters", auth.authenticateToken,controller.deleteBlogByFilters);

export default router;        