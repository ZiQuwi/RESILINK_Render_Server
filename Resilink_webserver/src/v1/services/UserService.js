const User = require("../database/UserDB.js");
const Utils = require("./Utils.js");
const util = require('util');
const urlSignIn = 'http://90.84.194.104:4000/oauth/api/v1.0.0/auth/sign_in';
const urlCreateUser = 'http://90.84.194.104:4000/oauth/api/v1.0.0/users?provider=http%3A%2F%2Flocalhost%3A';
const localhost = "22004";

//Récupère le token de l'administrateur
const functionGetTokenUser = async (body) => {
  console.log("activation de la fonction token");
    const tokenUser = JSON.parse(await Utils.executeCurl(
            "POST",
            urlSignIn,  
            headers = { 'Content-Type': 'application/json', 'accept': 'application/json'},
            body
        ));
    return tokenUser;
};

//Crée un nouvel user
const createUser = async (newUserRequest, token) => {
  console.log(util.inspect(newUserRequest));
  var phoneNumber;
  if (newUserRequest.whatsApp != null) {
    phoneNumber = newUserRequest.whatsApp;
    delete newUserRequest.whatsApp;
  }
  const creationUser = JSON.parse(await Utils.executeCurl(
    "POST",
    urlCreateUser + localhost,  
    headers = {'Content-Type': 'application/json', 'Authorization': token.replace(/^Bearer /, ''), 'accept': 'application/json'},
    newUserRequest
  ));
  if (phoneNumber != undefined) {
    creationUser.whatsApp = phoneNumber;
  }
  console.log(creationUser);
  User.newUser(creationUser, newUserRequest.password);
  console.log("sort de create user");
  return creationUser;
}

module.exports = {
    functionGetTokenUser,
    createUser
}