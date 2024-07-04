const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
  

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to the Post that was liked

});
const Like=mongoose.model("Like",likeSchema)


module.exports =Like
