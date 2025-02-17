require('dotenv').config(); //configuring dotenv
const express = require("express");
const db_connection = require("./database/db");
const authRouter = require("./routes/register_login");
const jobRouter = require("./routes/jobs");
const applicationRouter = require("./routes/application");
//Initializing app
const app = express();

//database connection
db_connection();

//Middlewares
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

//Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})