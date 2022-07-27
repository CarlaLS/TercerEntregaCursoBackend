const {Schema, model} = require('mongoose')


const productSchema=new Schema({

    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    price:{
        type:Number,
        required:true

    },

    image:{
    type:String
    },
  




})

// productSchema.methods.toJSON = function() {
//     const { __v, estado, ...data  } = this.toObject();
//     return data;
// }
module.exports = model('Productos', productSchema)