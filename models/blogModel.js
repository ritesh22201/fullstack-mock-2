const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    name : {type : String, ref : 'User', required : true},
    title : {type : String, required : true},
    content : {type : String, required : true},
    category : {type : String, enum : ['Business', 'Tech', 'Lifestyle', 'Entertainment'], required : true},
    date : {type : Date, default : Date.now},
    likes : [{type : mongoose.Schema.Types.ObjectId, ref : 'User' }],
    comments : [
        {
           userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
           content : {type : String },
        }
    ]
})

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;