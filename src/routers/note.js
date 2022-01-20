const router = require("express").Router();
const { NoteModel } = require("../model");
const _ = require("lodash");

router.get("/", (req, res) => {
  res.send("Hello, this is note router.");
});

// get note list
router.get("/user", async (req, res) => {
  try{
    const notes = await NoteModel.find({userId: req.body.userId}).select("-userId").select("-createdAt");
    if(notes.length === 0){
      res.json({
        message: "The user has no record yet or user not exist",
        status: 404,
        data: null
      });
      return;
    }
    res.json({
      message: "Success",
      status: 200,
      data: notes
    });
    return;
  }catch(err){
    res.status(500).json({
      message: "Server Error",
      status: 500,
      data: null
    });
    return;
  }
})

// get note
router.get("/:id", async (req, res) => {
  try{
    const noteFind = await NoteModel.findById(req.params.id).select("-userId").select("-createdAt");
    if(!noteFind){
      res.json({
        message: "Note not exist.",
        status: 404,
        data: null
      });
      return;
    }
    res.json({
      message: "Success",
      status: 200,
      data: noteFind
    });
    return;
  }catch(err){
    res.json({
      message: "Server Error",
      status: 500,
      data: null
    });
    return;
  }
})

// create note
router.post("/", (req, res) => {
  try {
    const note = new NoteModel(
      _.pick(req.body, ["title", "content", "userId"])
    );
    note.save();
    res.json({
      message: "success",
      status: 200,
      data: _.pick(note, ["_id", "title", "content", "updateAt"]),
    });
    return;
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      status: 500,
      data: null,
    });
    return;
  }
});

// Update note
router.put("/", async (req, res) => {
  try{
    const note = _.pick(req.body, ["_id", "title", "content"])
    const noteFind = await NoteModel.findByIdAndUpdate(note._id, {title: note.title, content: note.content}, {"new": false});
    if(!noteFind){
      res.json({
        message: "Note no exist.",
        status: 404,
        data: null
      });
      return;
    }
    res.json({
      message: "Success",
      status: 200,
      data: noteFind
    });
    return;
  }catch(err){
    res.status(500).json({
      message: "Server Error",
      status: 500,
      data: null
    });
    return;
  }
});

// delete note
router.delete("/:id", async (req, res) => {
  try{
    const noteDelete = await NoteModel.findByIdAndDelete(req.params.id);
    if(!noteDelete){
      res.json({
        message: "Note not exist.",
        status: 404,
        data: null,
      });
      return;
    }
    res.json({
      message: "Success",
      status: 200,
      data: noteDelete
    });
    return;
  }catch(err){
    res.status(500).json({
      message: "Server Error",
      status: 500,
      data: null
    });
    return;
  }
})

module.exports = router;
