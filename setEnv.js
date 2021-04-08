// Run before quasar build
const path = require('path');
const fs = require('fs');
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === undefined) {
    console.log("NODE_ENV not defined. Exiting App!");
    throw ("NODE_ENV not defined. Exiting App!");
  }else{
    try{
        var env_path = path.resolve(`.env.${process.env.NODE_ENV}`);
        fs.createReadStream(env_path).pipe(fs.createWriteStream(path.resolve(".env")));
    }catch(e){
        throw (`Error reading .env.${process.env.NODE_ENV} file`);
    }
  }