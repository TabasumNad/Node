import express from "express";
const router= express.Router();
import {client} from "../index.js";

router.get("/",async  function (request, response) {
    //db.movies.find({})
    
    // Cursor->pagination(20) | Cursor to array
        const movies= await client
        .db("b42wd")
        .collection("movies")
        .find({}).toArray();
        
        console.log(movies);
        
        response.send(movies);
      });
    
    
    

    
    
    
    //   http://localhost:4000/movies/id(params)
    
     
    router.get("/:id", async function (request, response) {
        const {id}=request.params;
    
        //   GET OPERATION to get data from from database
        // db.movies.findOne({"id":"100"})
    
    const movie=await client
    .db("b42wd")
    .collection("movies")
    .findOne({id:id});
       
        // const movie=movies.find((mv)=>mv.id==id);
        movie? response.send(movie):response.status(404).send({message:"NO MATCH FOUND"});
      });
      
    

    
    
    
    
    
    //   Post OPERATION to add/create movies to database
    // inbuilt middleware-->express.json() ///////////
    router.post("/", async  function (request, response) {
        const data=request.body; //request used to get the data
    console.log(data);
        const result =await client
        .db("b42wd")
        .collection("movies")
        .insertMany( data);
    
    
        response.send(result);
      });
      
    
    
    
    
    
    
    
    
    
    //   DELETE OPERATION 
    router.delete("/:id", async function (request, response) {
        const {id}=request.params;
    
        // db.movies.deleteOne({"id":"100"})
    
    const result=await client
    .db("b42wd")
    .collection("movies")
    .deleteOne({id:id});
       
    console.log(result);
    
    result.deleteCount >=1?response.send({message:"MOVIE WAS DELETED SUCCESSFULLY"}):
    response.status(404).send({message:"NO MOVIE FOUND"});
    
        
      });
    
    
    
    
    
    
    
    
    //   UPDATE OPERATION
    router.put("/:id", async function (request, response) {
        const {id}=request.params;
    
        // db.movies.updateOne({id:id},{$set:data})
    
        const data =request.body;
        console.log(data);
    
        const result=await client
    .db("b42wd")
    .collection("movies")
    .updateOne({id:id},{$set:data});
    response.send(result);
    
      });

export default router;      