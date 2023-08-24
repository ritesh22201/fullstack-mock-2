const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username : {type : String, required : true},
    title : {type : String, required : true},
    content : {type : String, required : true},
    category : {type : [String],enum : ['Business', 'Tech', 'Lifestyle', 'Entertainment'], required : true},
    date : {type : Date, default : Date.now},
    likes : [{type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true}],
    comments : [
        {
           userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
           content : {type : String, required : true},
        }
    ]
})

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;