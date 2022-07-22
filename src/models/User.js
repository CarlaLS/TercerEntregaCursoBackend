const {Schema, model}= require('mongoose');
const bcrypt= require('bcryptjs')

const UserSchema= new Schema({

    name:{type: String, required:true},
    email:{type: String, required:true, unique:true},
    address:{type: String, required:true},
    age: {type: String, required:true},
    phone: {type: String, required:true, trim: true},
    image:{type:String},
    password:{type: String, required:true}
});


UserSchema.methods.encryptPassword= async password => {
   const salt= await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};


UserSchema.methods.matchPassword=  async function (password) {
    return await bcrypt.compare(password, this.password )
}


module.exports= model('User', UserSchema);