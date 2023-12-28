import {Response,Request } from "express";
import db from "../models/index";
const Blog = db.blog;
import { Op } from 'sequelize';


const createBlogs = async(req:Request,res:Response)=>{
            try{
                let data = req.body;
                let savedData = await Blog.create(data);
                res.status(201).send({ status: true, data: savedData });
                
            }catch(error){
                console.log(error);
                return res.status(500).json({status:false,message:"Sorry, for your inconvience caused"})
            }
};   

const getBlogs = async(req:Request,res:Response)=>{
                try{
                    let conditions = req.query; 
  
                    let sequelizeConditions ={
                      where: {
                          [Op.and]: [
                            conditions,
                            { isDeleted: false }
                          ]
                        }
                    } 
                
                    // Fetching the blogs based on constructed conditions
                    let blogs = await Blog.findAll(sequelizeConditions);
              
                  if (blogs.length == 0)return res.status(404).send({ status: false, msg: "No Blogs found" });
              
                  res.status(200).send({ status: true, data: blogs }); 
               }catch(error){
                    return res.status(500).json({status:false,message:"Sorry, for your inconvenience caused"})
               }
};


const updateBlog = async(req:Request,res:Response)=>{
                try{
                    let blogId = req.params.id;                        
                    let blogData = req.body;

                    if(blogData.isPublished === true){
                    blogData.publishedAt= Date.now()
                    }else if(blogData.isPublished === false){
                    blogData.publishedAt=null;
                    }

                  // Updating the Blog
                    let [updatedRowsCount] = await Blog.update(blogData, {
                      where: {
                          blogId: blogId,
                          isDeleted: false,
                      },
                  });

                  if (updatedRowsCount === 0) {
                      return res.status(404).send({ status: false, msg: "No blogs found" });
                  }

              // // Fetch the updated blog after successful update
              let updatedBlog = await Blog.findOne({
                  where: {
                      blogId: blogId,
                      isDeleted: false,
                  },
              });

              return res.status(200).send({ status: true, data: updatedBlog });
                }catch(error){
                    console.log(error);
                return res.status(500).json({status:false,message:"Sorry, for your inconvenience caused"})

                }   
}

const deleteBlog = async(req:Request,res:Response)=>{
            try{
                let blogId = req.params.id;
                // Find the blog to delete
                const blog = await Blog.findOne({
                    where: {
                      blogId:blogId,
                      isDeleted: false,
                    },
                  });

                if (!blog) {
                  return res.status(404).send({ status: false, msg: "Blog Not Found" });
                }
                // Mark the blog as deleted (soft delete)
                blog.isDeleted = true;
                blog.deletedAt = new Date();
            
                // Save changes
                await blog.save();
                res.status(200).send({ status: true, msg: "Document is deleted" });

            }catch(error){
                return res.status(500).json({status:false,message:"Sorry, for your inconvenience caused"})
            }
}


const deleteBlogByFilters = async (req:Request,res:Response) => {
  try {
    const { userId, tags, category, subcategory } = req.query ;

    const whereClause :any = {};
    if (userId) whereClause.userId  = userId ;
    if (tags) {
      whereClause.tags = {
        [Op.like]: `%${tags}%`, // Using LIKE for partial tag match
      };
    }
    if (category) whereClause.category = category;
    if (subcategory) whereClause.subcategory = subcategory;

    // Find and delete blogs that match the query parameters
    const [deletedBlogsCount] = await Blog.update(
      { isDeleted: true, deletedAt: new Date() },
      { where: { ...whereClause, isDeleted: false } }
    );

    if (deletedBlogsCount > 0) {      
      return res.status(200).send({message:"blogs deleted"}); // Status 200 without any response body
    } else {
      return res.status(404).json({
        message: 'No blogs found with the specified criteria',
      });
    }  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: 'Sorry, for your inconvenience caused' });
  }
};    

const controller = {createBlogs,getBlogs,updateBlog,deleteBlog,deleteBlogByFilters}  ;
export default controller;

