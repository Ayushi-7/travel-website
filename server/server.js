import { MongoClient, ServerApiVersion, ObjectId  } from 'mongodb';
const client = new MongoClient('mongodb+srv://GetLost:UmassCS326Group17@getlost.pg6g8oa.mongodb.net/?retryWrites=true&w=majority&socketTimeoutMS=1000000&connectTimeoutMS=1000000');
import express from 'express';
import * as path from "path";
const app = express();
const port = 5501;
let db;
// console.log("hi");
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//   }
// });

async function run(){
  try{
    await client.connect();
    console.log("connected");
  }
  catch(err){
    console.log(err.stack);
  }
}
run().catch(console.dir);

db = client.db('GetLost');

app.use(express.static('client'));
app.use(express.json());

app.post('/createPost', async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const imageURL = req.body.imageurl;
  const collection = db.collection('postsinfo');

  try {
    collection.insertOne({ name: name, description: description, imageurl: imageURL });
    res.status(200).json({"new": "post"});
  } catch (err) {
    console.log('Error creating post:', err);
    res.status(404).send("ERROR");
  }
});

app.get('/getPost', (req, res) => {
  const id = req.params.id;
  const collection = db.collection('postsinfo');

  collection.findOne({ _id: new ObjectId(id) }, (err, result) => {
    if (err) {
      console.log('Error reading post:', err);
      res.status(500).send('Error reading post');
    } else if (!result) {
      console.log('Post not found');
      res.status(404).send('Post not found');
    } else {
      console.log('Post found:', result);
      res.send(result);
    }
  });
});

app.put('/updatePost', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const imageURL = req.body.imageurl;
  const collection = db.collection('postsinfo');

  collection.updateOne({ _id: new ObjectId(id) }, { $set: { name: name, description: description, imageURL: imageURL } }, (err, result) => {
    if (err) {
      console.log('Error updating post:', err);
      res.status(500).send('Error updating post');
    } else if (result.modifiedCount === 0) {
      console.log('Post not found');
      res.status(404).send('Post not found');
    } else {
      console.log('Post updated:', result);
      res.send('Post updated');
    }
  });
});

app.delete('/deletePost', (req, res) => {
  const id = req.params.id;
  const collection = db.collection('postsinfo');

  collection.deleteOne({ _id: new ObjectId(id) }, (err, result) => {
    if (err) {
      console.log('Error deleting post:', err);
      res.status(500).send('Error deleting post');
    } else if (result.deletedCount === 0) {
      console.log('Post not found');
      res.status(404).send('Post not found');
    } else {
      console.log('Post deleted:', result);
      res.send('Post deleted');
    }
  });
});

app.get('/getPost', async (req, res) => {
  res.status(200).send(true);
})

app.get('/displayPosts', async (req, res) => {
  try {
    const posts = await db.collection('postsinfo').find({}).toArray();
    console.log(posts);
    res.send(posts).status(200);
  } catch (err) {
    console.log('Error getting all posts:', err);
    res.status(404).send("ERROR");
  }
})

// start the server
app.listen(port, () => {
  console.log('Server listening at http://localhost:5501');
});
