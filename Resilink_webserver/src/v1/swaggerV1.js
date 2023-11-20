// ---------------------------------------------------
// ---------------------------------------------------

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API
let options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Resilink Mid-plateform",
        version: "1.0.0",
        description:
          "API to perform calculations or add information between the Orange API and the mobile application.",
        license: {
          name: "",
        },
        contact: {
          name: "Axel Cazaux, LIUPPA",
          email: "axel.cazaux@univ-pau.fr",
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      security: [{
        bearerAuth: []
      }]
    },
    apis: ["./src/v1/routes/*.js"],
};

// ---------------------------------------------------

// Function to setup our docs
const swaggerDocs = (app, port) => {
    // Add servers to options
    options.definition.servers = [
        {
          //TODO NE PAS OUBLIER DE LA CHANGER EN PERMANENCE POUR LA RENDRE ACCESSIBLE SUR INTERNET 
            url: `http://193.55.218.15:${port}`, 
        },
    ];

    // Docs in JSON format
    const swaggerSpec = swaggerJSDoc(options);  

    // Route-Handler to visit our docs
    app.use(
        "/v1/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
        );
      
    // Make our docs in JSON format available
    app.get(
        "/v1/api-docs.json",
        (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.send(swaggerSpec);
        }
        );
        console.log(swaggerSpec);
      
    // Add a search bar to the UI just in case the API has too many operations
    app.use(
        "/v1/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, { explorer: true })
        );

    console.log(`Docs are available on https://resilink-api.onrender.com/v1/api-docs [Version 1]`);
};  

// ---------------------------------------------------
// ---------------------------------------------------

module.exports = { swaggerDocs };

// ---------------------------------------------------
// ---------------------------------------------------
