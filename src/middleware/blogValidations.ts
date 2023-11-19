import { Request,Response,NextFunction } from "express";
interface ExtendedRequest extends Request {
    userId?: string; // Modify the type to match your userId data type
  }
const createBlogsValidations = async  (req:ExtendedRequest,res:Response,next:NextFunction)=> {
    try {
      let data = req.body;
      
      // Checks if title is empty or entered as a string or contains valid Title
      if (!data.title)  return res.status(400).send({ status: false, msg: "Please Enter Title" });
      if (typeof data.title !== "string") return res.status(400).send({ status: false, msg: " Please enter title as a String" });
      let validTitle = /^\d*[a-zA-Z][a-zA-Z\d\s]*$/;
      if (!validTitle.test(data.title)) return res.status(400).send({ status: false, msg: "The Title may contain letters and numbers, not only numbers"});
      data.title = data.title.trim();
  
      // Checks if Body is empty or entered as a string
      if (!data.body)  return res.status(400).send({ status: false, msg: "Please Enter Body" });
      if (typeof data.body !== "string") return res.status(400).send({ status: false, msg: " Please enter body as a String " });
      if (data.body.length <= 10)  return res.status(400).send({status: false,msg: "The body should contain at least 10 characters"});
      data.body = data.body.trim();
  
      // we are assigning UserId of decoded token 
      data.userId= req.userId;  
      // const [rows] = await connection.promise().query('SELECT * FROM users WHERE UserId = ?', [req.UserId]);
      //   console.log(rows);
      
      // Checks if category is empty or entered as a string or contains valid Category
      if (!data.category) return res.status(400).send({ status: false, msg: "Please Enter Category" });
      if (typeof data.category !== "string")  return res.status(400).send({ status: false, msg: "Please enter Category as a String" });
      let validCategory = /^\w[a-zA-Z]*$/;
      if (!validCategory.test(data.category)) return res.status(400).send({ status: false, msg: "The Category may contain only letters" });
      data.category = data.category.trim();
  
  
      //If isPublished is true then adding timestamp
      if (data.isPublished) {
        if (typeof data.isPublished !== "boolean")
          return res.status(400).send({
            status: false,
            msg: "Please mention isPublished as True or False",
          });
        if (data.isPublished == true) {
          let date = Date.now();
          data.publishedAt = date;
        }
      }
      next();
    } catch (error:any) {
      console.log(error);
      res.status(500).send({ status: false, msg: error.message });
    }
  };
  
  const updateValidations = async function (req:Request,res:Response,next:NextFunction) {
    try {
      let post_id=req.params.id
      if (!post_id)
        return res.status(400).send({ status: false, msg: "Enter BlogId" });
      let data = req.body;
  
      // Checks if title is empty or entered as a string or contains valid Title
      if (data.title) {
        if (typeof data.title !== "string")
          return res.status(400).send({ status: false, msg: " Please enter title as a String" });
        data.title = data.title.trim();
        let validTitle = /^\d*[a-zA-Z][a-zA-Z\d\s]*$/;
        if (!validTitle.test(data.title))
          return res.status(400).send({status: false,msg: "The Title may contain only letters and numbers"});
      }
  
      // Checks if Body is empty or entered as a String
      if (data.body) {
        if (typeof data.body !== "string")
          return res.status(400).send({ status: false, msg: " Please enter body as a String" });
        data.body = data.body.trim();
        if (data.body.length <= 10)
          return res.status(400).send({status: false,msg: "The body should contain at least 10 characters"});
      }
      if (data.isPublished) {
        if (typeof data.isPublished !== "boolean")
          return res.status(400).send({ status: false, msg: " Please enter isPublished as Boolean" });
      }
  
      next();
    } catch (error:any) {
      console.log(error);
      res.status(500).send({ status: false, msg: error.message });
    }
  };
  const validations =  { createBlogsValidations, updateValidations };

   export default validations;