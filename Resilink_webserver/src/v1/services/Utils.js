const { exec } = require('child_process');
const { Readable } = require('stream');

//Fonction pour lancer une commande Curl directement dans le serveur
//Si la variable headers et body ne sont pas définies, alors elles prendront respectivement la valeur d'un objet vide et null
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

function streamToString(stream) {
  const readablestream = Readable.from(stream)
  const chunks = [];
  return new Promise((resolve, reject) => {
    readablestream.on('data', (chunk) => {
          chunks.push(chunk);
      });
      readablestream.on('end', () => {
          resolve(Buffer.concat(chunks).toString('utf8'));
      });
      readablestream.on('error', reject);
  });
}

const streamToJSON = async (stream) => {
  return streamToString(stream).then((data) => JSON.parse(data)).then((result) => {
    return result;
  });
}

const fetchJSONData = async (method, url, header, body = null) => {

  const params = {
      method: method,
      headers: header
  };

  if (body !== null) {
    params.body = JSON.stringify(body);
  }

  return fetch(url, params)
  .then(response => {
    return response;
  });
}


module.exports = {
  executeCurl,
  streamToJSON,
  fetchJSONData
}


