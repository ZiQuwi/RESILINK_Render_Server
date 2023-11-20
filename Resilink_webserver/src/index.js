// In src/index.js 
const express = require("express"); 
const bodyParser = require("body-parser");
//const http = require('http');
//const socketIO = require("socket.io");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swaggerV1.js");

const PORT = process.env.PORT || 9990;


// ---------------------------------------------------

// Start Express.js && socket.io
const app = express(); 
//const server = http.createServer(app);
//const io = socketIO(server);


// Start morgan.js (only for dev)
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use(bodyParser.json());
// ------------------------------------------------

// Middleware CORS pour autoriser l'accès depuis n'importe quelle origine
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://resilink-api.onrender.com/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// --------------------------------------------------

const v1ProsummerRouter = require("./v1/routes/ProsummerRoute.js");
app.use("/v1/", v1ProsummerRouter);

const v1UserRouter = require("./v1/routes/UserRoute.js");
app.use("/v1/", v1UserRouter);

const v1OfferRouter = require("./v1/routes/OfferRoute.js");
app.use("/v1/", v1OfferRouter);

const v1AssetRouter = require("./v1/routes/AssetRoute.js");
app.use("/v1/", v1AssetRouter);

const v1AssetTypeRouter = require("./v1/routes/AssetTypeRoute.js");
app.use("/v1/", v1AssetTypeRouter);

const v1RegulatorRouter = require("./v1/routes/RegulatorRoute.js");
app.use("/v1/", v1RegulatorRouter);

const v1RequestRouter = require("./v1/routes/RequestRoute.js");
app.use("/v1/", v1RequestRouter);

const v1ContractRoute = require("./v1/routes/ContractRoute.js");
app.use("/v1/", v1ContractRoute);

// Gestion des connexions
/*io.on('connection', (socket) => {
  console.log('Nouvelle connexion:', socket.id);

  // Gestion des déconnexions
  socket.on('disconnect', () => {
    console.log('Déconnexion:', socket.id);
  });

  // Écoute des messages du client
  socket.on('broadcast-message', (message) => {
    console.log(`Message reçu de ${socket.id}: ${message}`);
    // Diffuser le message à tous les clients
    io.emit('broadcast', { sender: socket.id, message });
  });

  // Écoute des messages privés du client
  socket.on('private-message', ({ recipient, message }) => {
    console.log(`Message privé de ${socket.id} à ${recipient}: ${message}`);
    // Envoyer le message privé à un utilisateur spécifique
    io.to(recipient).emit('private-message', { sender: socket.id, message });
  });
});
*/

//start application Express.js (pour notre les requêtes)
app.listen(PORT, '0.0.0.0', () => { 
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT); 
});

//start serveur pour une écoute sur nos sockets
/*server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});*/
