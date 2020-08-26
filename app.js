require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors())

mongoose.connect("mongodb+srv://myjournal_user:"+process.env.MONGOPWD+"@haiyo-cluster.hdjma.mongodb.net/myjournalDB?retryWrites=true&w=majority", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const postSchema = {
  image: String,
  title: String,
  date: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {
  res.send("Welcome to my journal API, go to /journal to view my posts");
});


app.get("/journal", (req, res) => {

  Post.find({}, async (err, posts) => {
    try {
      res.send(posts);
    } catch {
      res.send(err);
    }

  });

});

app.get("/journal/posts/:postTitle", (req, res) => {
  const requestedPostTitle = req.params.postTitle;

  Post.findOne({title: requestedPostTitle}, async (err, post) => {
    try {
      res.send(post);
    } catch {
      res.send(err);
    }
  });

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
