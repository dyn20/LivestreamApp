const mongoose = require('mongoose');

async function connect()
{
    try{

       // await mongoose.connect('mongodb://localhost:27017/LiveStreamApp', {
           await mongoose.connect('mongodb+srv://ld20:duyen2001@livestreamapp.u47wb.mongodb.net/LivestreamApp',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('Connect successfully')
    } catch (error){
        console.log('Connect fail')

    }
}
module.exports = {connect};