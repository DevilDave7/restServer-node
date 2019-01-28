//===============================
//    config port
//===============================
process.env.PORT = process.env.PORT || 3000;

//===============================
//    Entorno
//===============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===============================
//    Database
//===============================
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/coffee_site';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;