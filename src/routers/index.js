const indexRouter = require("express").Router();
const noteRouter = require("./note.js");
const userRouter = require("./user.js");

indexRouter.get("/", (req, res) => {
  res.send("This is note app api.");
});

indexRouter.use("/note", noteRouter);
indexRouter.use("/user", userRouter);

module.exports = indexRouter;
