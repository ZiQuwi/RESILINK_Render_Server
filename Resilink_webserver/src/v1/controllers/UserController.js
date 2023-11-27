const userService = require("../services/UserService.js");

const getTokenUser = async (req, res) => {
    try {
      const response = await userService.functionGetTokenUser(req.body);
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération du token');
    }
  };

const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération du token');
  }
}

  module.exports = {
    getTokenUser,
    createUser
};
  