const mongoose=require("mongoose");
const { number } = require("zod");
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
const adminSchema=new Schema({
    email:{type:String,unique:true},
    password:{type:String,unique:true},
    name:{type:String}
});
const userSchema=new Schema({
    name:{type:String},
    address:{type:String},
    phoneNumber:{type:String,unique:true},
    email:{type:String,unique:true},
    userId:{type:ObjectId,ref:"admin",require:true}
});
const productSchema=new Schema({
    name:{type:String},
    category:{type:String},
    description:{type:String},
    pictures:{type:String},
    price:Number,
    creatorId:{type:ObjectId,ref:"admin"},
    status: {type: String,enum: ['placed', 'shipped', 'delivered', 'cancelled'],default: 'placed'},
    createdAt: {type: Date,default: Date.now},
    updatedAt: {type: Date,default: Date.now}
})
const purchesSchema=new Schema({
    productId:{type:ObjectId,ref:"product"},
    userId:{type:ObjectId,ref:"user"}
})
const adminModel=mongoose.model("admin",adminSchema);
const userModel=mongoose.model("user",userSchema);
const productModel=mongoose.model("product",productSchema);
const purchesModel=mongoose.model("purches",purchesSchema);
module.exports={
    adminModel,
    userModel,
    productModel,
    purchesModel
}