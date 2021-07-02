require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const app = express();

require("./config/dbConnection");

app.use(express.json());
app.use(cookieParser());
app.use(require("./routers/register"));
app.use(require("./routers/login"));
app.use(require("./routers/instructors"));
app.use(require("./routers/instructor"));
app.use(require("./routers/classes"));
app.use(require("./routers/student"));
app.use(require("./routers/logout"));

app.listen(port, () => {
  console.log(`server is listning on ${port}`);
});
