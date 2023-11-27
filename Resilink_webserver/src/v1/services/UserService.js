const User = require("../database/UserDB.js");
const Utils = require("./Utils.js");
const util = require('util');
const urlSignIn = 'http://90.84.194.104:4000/oauth/api/v1.0.0/auth/sign_in';
const urlCreateUser = 'http://90.84.194.104:4000/oauth/api/v1.0.0/users?provider=http%3A%2F%2Flocalhost%3A';
const localhost = "22004";

//Récupère les données de l'utilisateur
const functionGetTokenUser = async (body) => {
    const response = await Utils.fetchJSONData(
            "POST",
            urlSignIn,  
            headers = { 'Content-Type': 'application/json', 'accept': 'application/json'},
            body
        );
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
};

//Crée un nouvel user
const createUser = async (newUserRequest, token) => {
  console.log(util.inspect(newUserRequest));
  var phoneNumber;
  if (newUserRequest.whatsApp != null) {
    phoneNumber = newUserRequest.whatsApp;
    delete newUserRequest.whatsApp;
  }
  const response = await Utils.fetchJSONData(
    "POST",
    urlCreateUser + localhost,  
    headers = {'Content-Type': 'application/json', 'Authorization': token.replace(/^Bearer /, ''), 'accept': 'application/json'},
    newUserRequest
  );
  const data = await Utils.streamToJSON(response.body)
  if (phoneNumber != undefined) {
    data.whatsApp = phoneNumber;
  }
  User.newUser(data, newUserRequest.password);
  return [data, response.status];
}

module.exports = {
    functionGetTokenUser,
    createUser
}