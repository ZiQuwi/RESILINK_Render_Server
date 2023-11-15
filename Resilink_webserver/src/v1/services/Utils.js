const { exec } = require('child_process');

//Fonction pour lancer une commande Curl directement dans le serveur
//Si la variable headers est body ne sont pas définies, alors elles prendront respectivement la valeur d'un objet vide et null
const executeCurl = (type, url, headers = {}, body = null) =>{
    return new Promise((resolve, reject) => {
      let command = 'curl -X ';
      command += type + " " + url;
      //Ajouter les en_têtes s'ils sont définis
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          command += ` -H "${key}:${headers[key]}"`;
        }
      }
  
      // Ajouter le corps de la requête s'il est défini
      if (body !== null) {
        command += ` -d '${JSON.stringify(body)}'`;
      }
  
      console.log(command);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
};

module.exports = {
  executeCurl
}