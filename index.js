// index.js
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const usersRoute = require("./routes/usersRoutes");
const postRoute = require("./routes/postsRoutes");

app.use("/users", usersRoute);
app.use("/posts", postRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
