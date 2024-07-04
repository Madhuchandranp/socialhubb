const mongoose = require('mongoose');
const commentSchema = require("./Comment");

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  // video: { type: String ,required: true},
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] } ,
  reports: { type: Number, default: 0 },
  reportedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] } ,
  likesList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }], // Reference to likes using Like schema

      comments: {
      type: [commentSchema],
      default:[],
    },
    commentCount: { type: Number,default: 0 },
    
}, 
{ timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
