const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
    type:String,
  },


    mainImg:{
      type:String,
    },
    images:{
      type:Array,
    },


    address:{
      type:String,
    },
    smallDescription:{ type: String},
    advantagesIcon: {type: Array},
    advantagesDescription: {type: Array},
    square:{type: String},
    cost:{type: String},
    mapScript:{type: String},
    subtitle: {type:String},
    conveniences: {type:Array},
    entertainments: {type:Array},
    yardEntertainments: {type:Array},
    additionalInformation: {type:String},


  status:{
    type:Boolean
  },
  buttonId:{
    type:String
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
