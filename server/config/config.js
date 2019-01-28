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

if(process.env.NODE_ENV !== 'dev'){
    urlDB = 'mongodb://localhost:27017/coffee_site';
}else{
    urlDB = 'mongodb://coffeManager:hh4eZrpEffK4raa@ds259144.mlab.com:59144/coffee_site';
}

process.env.urlDB = urlDB;