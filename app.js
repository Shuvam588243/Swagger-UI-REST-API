//Requiring Packages
require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yaml');
const mongoose = require('mongoose');
const ArticleRoutes = require('./Routes/articleRoutes');
const port = process.env.PORT || 3000;

//App Middlewares
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/article',ArticleRoutes);

//Mongoose Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
).then(()=>
{
    console.log('Database Connected');
});


//Home Page Routes
app.get('/',(req,res)=>
{
   res.send("Welcome to Articles API");
})

//Listening Function
app.listen(port,()=>
{
    console.log(`Listening to Port ${port}`);
})
