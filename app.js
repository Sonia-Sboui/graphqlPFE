const express = require ('express');
const bodyParser = require ('body-parser');
const graphqlHttp = require ('express-graphql');
const mongoose = require ('mongoose');
const graphqlSchema = require ('./graphql/schema/index');
const graphqlResolvers = require ('./graphql/resolvers/index');
const auth = require ('./midlleware/auth');
//require('dotenv');
app = express();
app.use(bodyParser.json());
app.use(auth);
app.use ('/graphql',graphqlHttp({
    schema: graphqlSchema ,
    rootValue : graphqlResolvers,
    graphiql: true
}));
// connection to database
mongoose.connect(`mongodb+srv://sonia:sonia@cluster0-fyh6x.mongodb.net/test?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useMongoClient:true
  })
.then(()=>{
    console.log("connected")
    app.listen(3300);
}) // lancer l'app sur le port 3300)

.catch(err=>{
console.log(err)
});
