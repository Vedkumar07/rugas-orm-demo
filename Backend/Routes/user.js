const{Router}=require("express");
const{userModel}=require("../db");
const{purchesModel}=require("../db");
const{productModel}=require("../db");
const{amdminMiddleware}=require("../middleware/amdminMiddleware");
const{userMiddleware}=require("../middleware/userMiddleware")
const{z}=require("zod");
const jwt=require("jsonwebtoken");
const JWT_USER=process.env.JWT_USER;
const createUser=Router();
createUser.post('/add',amdminMiddleware,async (req,res)=>{
    const adminId=req.userId;
    const requireBody=z.object({
        name:z.string().min(5).max(100),
        address:z.string().min(5).max(100),
        phoneNumber:z.string(),
        email:z.string().min(3).max(100).email()
    })
    const parseDataWithSucess=requireBody.safeParse(req.body);
    if(!parseDataWithSucess.success){
       return res.status(400).json({
            message:"Incorrect format",
            error:parseDataWithSucess.error
        });
    }
    const name=req.body.name;
    const address=req.body.address;
    const phoneNumber=req.body.phoneNumber;
    const email=req.body.email;
    try{
        const user=await userModel.create({
            name:name,
            address:address,
            phoneNumber:phoneNumber,
            email:email,
            userId:adminId
        })
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_USER);
        return res.json({
            "token":token
        })
    }catch(e){
        return res.status(500).json({
            message:"Error During signUp",
            error:e.message
        })
    }
});
createUser.get("/getUser",amdminMiddleware,async(req,res)=>{
    const userId=req.userId;
    try{const userData=await userModel.find({
        userId:{$in:userId}
    });
    res.json({userData});
}catch(error){
    res.json({error:error.message});
}
});
createUser.post("/buy",userMiddleware,async (req,res)=>{
    const userId=req.userId;
    const productId=req.body.productId;
    try{
        await purchesModel.create({
        userId:userId,
        productId:productId
    })
    res.json({
        message:"product is been bought"
    })
}catch(error){
    res.json({
        error:error.message
    })
}
});

createUser.get("/boughtProduct", userMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    // First get all purchases for this user
    const purchases = await purchesModel.find({ userId: userId });
    
    // Extract just the productId values from the purchases
    const productIds = purchases.map(purchase => purchase.productId);
    
    // Now find all products that match these IDs
    const productDetail = await productModel.find({ 
      _id: { $in: productIds } 
    });
    
    res.json({
      productDetail
    });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
});
module.exports={
    createUser:createUser
}