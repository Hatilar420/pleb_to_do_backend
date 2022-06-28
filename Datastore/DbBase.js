const mongoose  =  require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_HOSTED_ADD}/${process.env.DBNAME}`,
{useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    console.log("Success")
}).catch((err) => {
    console.log(err)
});