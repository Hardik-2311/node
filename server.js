const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const connectDb=require("./Config/db_connection")
const port = process.env.PORT;
connectDb()
// app.get("/api/contacts",(req,res)=>{
//     res.status(200).json({message:"get all the contacts"});
// })
app.use(express.json());  //parsing the data coming in as the input
app.use("/api/contacts",require("./routes/contact_route"));

app.listen(port, () => {
  console.log("server is live on port", port);
});
