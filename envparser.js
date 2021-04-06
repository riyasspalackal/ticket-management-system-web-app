const DotEnv = require('dotenv');
const path = require('path');
var parsedEnv = DotEnv.config().parsed


module.exports = function () {

  parsedEnv['LOGIN_END_POINT'] = process.env.LOGIN_END_POINT
  
  console.log(process.env.LOGIN_END_POINT);
  return parsedEnv;
}