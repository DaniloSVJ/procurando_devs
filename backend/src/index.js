const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')

const routes = require('./routes');
const {setupWebsocket}=require('./webSocked')

const app = express();

const server= http.Server(app)

setupWebsocket(server);

mongoose.connect('mongodb+srv://oministack:777dsvj@cluster0-e8pr0.mongodb.net/week10?retryWrites=true&w=majority',  {
      useNewUrlParser: true, 
      useUnifiedTopology: true,

});
mongoose.Promise = global.Promise;


    app.use(cors())
    app.use(express.json());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(routes);

    server.listen(3333);
module.exports=mongoose;
//Metodos Http: get, post, put, delete

//Tipo de Parametros:

//Query Params: request.query(Filtros,ordenação, paginação ...)
//Routes Params:request.params(Identifica um recuso na alteração ou remoção)
//Body:



