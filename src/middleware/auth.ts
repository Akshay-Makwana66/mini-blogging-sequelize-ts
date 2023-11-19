import { NextFunction, Request,Response } from "express";
import jwt,{VerifyErrors,JwtPayload} from 'jsonwebtoken'
import db from "../models/index";
const Blog = db.blog;
const SECRET_KEY="blogs";
interface DecodedToken {
    userId: string;
    // Add other properties from your decoded token if needed
  }
  
  interface AuthenticatedRequest extends Request {
    userId?: string;
  }
  
  const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-api-key'] as string; // Explicitly cast to string
    if (!token) return res.status(401).send('Access denied.');
    
    let decodedToken: JwtPayload | undefined;
  
    try {
      decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
      // Assuming token verification succeeded, proceed to extract the userId
      if (decodedToken && typeof decodedToken === 'object') {
        const decoded: DecodedToken = decodedToken as DecodedToken;
        req.userId = decoded.userId;
      }
      next();
    } catch (error:any) {
      res.status(500).send({ status: false, msg: error.message });
    }
  };
  
// Extending the Request type to include a userId property
interface AuthorizedRequest extends Request {
    userId?: number; // Adjust the type to match your userId data type
  }
const authorization = async (req:AuthenticatedRequest, res:Response, next:NextFunction) =>{
    try {
  
      let blogId = req.params.id;
      
      if(blogId){
  
        let findBlog = await Blog.findOne({ where: { blogId:blogId } });
        if (findBlog) {
          if (req.userId != findBlog.userId) return res.status(403).send({ status: false, msg:"Author is not authorized to access this data"});
        }
      }
      next();  
  
    } catch (error:any) {
          res.status(500).send({ status: false, msg: error.message });
    }
  };
  const auth = {authenticateToken,authorization}  ;
  export default auth;
