const { exec } = require('child_process');
const { Readable } = require('stream');

/*
  Function to run a Curl command directly in the server
  If the headers and body variables are not defined, they will take the value of an empty object and null respectively.
*/
const executeCurl = (type, url, headers = {}, body = null) =>{
    return new Promise((resolve, reject) => {
      let command = 'curl -X ';
      command += type + " " + url;

      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          command += ` -H "${key}:${headers[key]}"`;
        }
      }
  
      if (body !== null) {
        command += ` -d '${JSON.stringify(body)}'`;
      }
  
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
};

//Converts a stream into a character string.
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

//Converts a stream into a JSON object.
const streamToJSON = async (stream) => {
  return streamToString(stream).then((data) => JSON.parse(data)).then((result) => {
    return result;
  });
}

//Makes an HTTP request with the specified method, URL, headers and body, and returns the response.
const fetchJSONData = async (method, url, header, body = null) => {

  const params = {
      method: method,
      headers: header
  };

  if (body !== null) {
    params.body = JSON.stringify(body);
  };

  return fetch(url, params)
  .then(response => {
    return response;
  });
}

/*
 * Calculates the distance in kilometers between two geographical points specified by their latitudes and longitudes.
 * R represents the Earth's radius in kilometers and distance is in kilometers
 */
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 

  return distance;
}

/*
  checks whether the distance between 2 geographical points is too far apart
*/
const isInPerimeter = (lat1, lon1, lat2, lon2, perimeterRadius) => {
  console.log("IN");
  const distance = haversine(lat1, lon1, lat2, lon2);

  return (distance <= perimeterRadius);
}


module.exports = {
  executeCurl,
  streamToJSON,
  fetchJSONData,
  isInPerimeter,
}

