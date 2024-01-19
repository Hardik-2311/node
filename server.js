const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;



// database connection
const connectDb = require("./Config/db_connection");
connectDb();

// database connection ends

//parsing the data coming in as the input
app.use(express.json());
// it converts data from input to json

// routes
app.use("/api/contacts", require("./routes/contact_route"));
app.use("/api/users", require("./routes/user_route"));
// routes end

// server at which port
app.listen(port, () => {
  console.log("server is live on port", port);
});
