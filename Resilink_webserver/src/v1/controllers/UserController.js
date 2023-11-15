const userService = require("../services/UserService.js");

const getTokenUser = async (req, res) => {
    try {
      const tokenUser = await userService.functionGetTokenUser(req.body);
      res.send(tokenUser);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération du token');
    }
  };

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body, req.header('Authorization'));
    res.send(user);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération du token');
  }
}

  module.exports = {
    getTokenUser,
    createUser
};
  