const {Schema, model} = require('mongoose')
const postSchema = new Schema ({
     name: String,
     readyToEat: Boolean,
     color: String
}, {
     timestamps:true
})
const Post = model('Post', postSchema)
module.exports = Post;