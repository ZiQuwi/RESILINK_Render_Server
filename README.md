# RESILINK v2 - Node.js API for a User Exchange Platform

RESILINK v2 is an API built with **Node.js** and **Express**, using **Swagger** for documentation. This API allows you to develop a platform for exchanges between users, with data stored in a **MongoDB** database. The API is free, accessible to everyone, and can be deployed locally by developers.

## Main Features

- RESTful API built with **Express** and documented with **Swagger**.
- Connection to a **MongoDB** database for managing users and exchanges.
- Encryption of sensitive data using AES-256.
- Easy local or server deployment with configuration via an `.env` file.

## Prerequisites

- **Node.js** (v18 or later)
- **MongoDB** (Cloud MongoDB cluster or local instance)

## Installation

At the root of the project folder:

1. **Clone the project**:

```bash
git clone https://github.com/ZiQuwi/RESILINK_Render_Server
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure environment variables**:

Create a file named **`RESILINK_Server.env`** at the root of the project with the following variables:

```
IP_ADDRESS=resilink-dp.org
PORT=9990
SWAGGER_URL=https://resilink-dp.org
ENCRYPTION_KEY=b32c32aac9c6afd06ab3554415de5edbafc14ef97cc6d0e4ffa678220a57b39f
TOKEN_KEY=f0d8cd085ada735ac45c30e3368b5b4c87a8e7fb9828a2289af5065bad05b015
DB_URL=mongodb+srv://<username>:<password>@<cluster-url>/Resilink
DB_LOGS_URL=mongodb+srv://<username>:<password>@<cluster-url>/Logs

> **Note**: Replace the placeholder values with your actual keys and URLs.

The API automatically imports the `RESILINK_Server.env` file. Ensure that the file is named correctly to avoid manual updates in the code.

4. **Start the server**:

```bash
node src/index.js
```

By default, the server will start on the port defined in the `.env` file (or port 3000 if not specified). You can access your Swagger documentation for the API at the following address after starting the server:

```
http://localhost:3000/api-docs
```

## Usage

The **RESILINK** API allows interaction between users on the platform through various routes, following the structure of the **ODEP API** to organize exchanges.

The main routes manage:
- **Users** (USER)
- **Prosumers** (PROSUMER)
- **Regulators** (REGULATOR)
- **Assets** (ASSET)
- **Asset Types** (ASSETTYPE)
- **Offers** (OFFER)
- **News** (NEWS)

## Project Structure

```
/v1
	/src
    	/controllers  	# Handles HTTP requests and responses, interacts with services
    	/services     	# Business logic for the API
    	/database     	# Manage data in MongoDB
    	/models       	# Entity models
    	/routes       	# API route definitions with swagger annotations
	config.js       	# Configuration variable
	errors.js       	# Definitions of the various errors
	loggers.js      	# Log management
	swaggersV1.js   	# Definition of the swagger page
.env              	# Environment variables configuration file
config.js         	# Global configuration file
server.js         	# Main entry point of the API
```

## Deployment

To deploy this API in a production environment, ensure that all environment variables are correctly configured, including the MongoDB cluster URL and the keys.


