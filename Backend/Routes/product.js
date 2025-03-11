const{Router}=require("express");
const{amdminMiddleware}=require("../middleware/amdminMiddleware");
const{productModel}=require("../db");
const productList=Router();
productList.post("/add",amdminMiddleware ,async(req,res)=>{
    const adminId=req.userId;
    const{name,category,description,pictures,price,status}=req.body;
    try{const product=await productModel.create({
        name:name,
        category:category,
        description:description,
        pictures:pictures,
        price:price,
        creatorId:adminId,
        status:status
    });
    res.json({
        message:"Product added",
        productId:product._id
    })
}catch(error){
    res.json({
        message:"Error During creatinProduct",
        error:error.message
    })
}
});
productList.get("/productBulk",amdminMiddleware,async(req,res)=>{
    const creatorId=req.userId;
    try{
        const productBulk=await productModel.find({
        creatorId:{$in:creatorId}
    },{});
    res.json({
        productBulk
    });
}catch(error){
    res.json({
        message:"Error while fetching",
        error:error.message
    })
}
});
module.exports={
    productList:productList
}