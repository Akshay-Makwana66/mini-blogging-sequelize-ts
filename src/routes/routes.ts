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
router.get("/getBlogsByFilters", auth.authenticateToken,controller.getBlogs);
router.put("/updatepost/:id", auth.authenticateToken,auth.authorization,validations.updateValidations,controller.updatePost);
router.delete("/deletepost/:id", auth.authenticateToken,auth.authorization,controller.deletePost);
router.delete("/deletepostByFilters", auth.authenticateToken,controller.deleteByFilters);

export default router;     