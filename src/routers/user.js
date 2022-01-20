const router = require("express").Router();
const { UserModel } = require("../model");
const _ = require("lodash");

router.get("/", (req, res) => {
  res.send("Hello, this is user router.");
});

// get user
router.get("/:id", async (req, res) => {
  const userFind = await UserModel.findById(req.params.id).select("-password");
  res.json({
    message: "Success",
    status: 200,
    data: userFind
  });
  return;
})

// create user
router.post("/", async (req, res) => {
  try {
    const user = _.pick(req.body, ["username", "password"]);
    let userFind = await UserModel.findOne({
      username: user.username,
    });
    if (userFind) {
      return res.json({
        message: "User already registered.",
        status: 400,
        data: null,
      });
    }
    userFind = await new UserModel(user);
    await userFind.save();
    res.json({
      message: "Success",
      status: 200,
      data: _.pick(userFind, ["_id", "username", "password"]),
    });
    return;
  } catch (err) {
    res.json({
      message: "Server Error",
      status: 500,
      data: null,
    });
    return;
  }
});

// change password
router.put("/", async (req, res) => {
  try {
    const user = _.pick(req.body, ["username", "password", "confirmPassword"]);
    let userFind = await UserModel.findOneAndUpdate(
      { username: user.username, password: user.password },
      { password: user.confirmPassword }
    ).select("-password");
    if (!userFind) {
      res.json({
        message: "Invalid password",
        status: 400,
        data: null,
      });
      return;
    }
    res.json({
      message: "Success",
      status: 200,
      data: _.pick(userFind, ["_id", "username", "password"])
    })
    return;
  } catch (err) {
    res.json({
      message: "Server Error",
      status: 500,
      data: null,
    });
    return;
  }
});

module.exports = router;
