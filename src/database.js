const mongoose = require('mongoose')


const MONGO_ATLAS = 'mongodb+srv://Carla:carla@cluster0.sktlunu.mongodb.net/myprimerdb?retryWrites=true&w=majority'

mongoose.connect(MONGO_ATLAS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
  
 
})

    .then (db => console.log ('Base de datos esta conectada'))
    .catch(err=> console.log (err));

