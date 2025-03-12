require("dotenv").config();
const express=require("express");
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");
const {createAdmin}=require("./Routes/admin");
const{createUser}=require("./Routes/user");
const{productList}=require("./Routes/product")
const port=process.env.PORT;
const corsOptions = {
    origin: process.env.Front_End, // Explicitly set frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/admin",createAdmin);
app.use("/user",createUser);
app.use("/product",productList);
async function main(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("cONNECTED TO MONGOOSE");

        app.listen(port,()=>{
            console.log("survor is running");
        })
    }catch(error){
        console.error("Error startin survor : ",error);
        process.exit(1);
    }
}
main()

