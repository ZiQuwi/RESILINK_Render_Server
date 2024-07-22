const { MongoClient } = require('mongodb');
const winston = require('winston');

const connectDB = winston.loggers.get('ConnectDBResilinkLogger');

// MongoDB Atlas cluster connection _url
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";
const _url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';

let client;
let db;

const connectToDatabase = async () => {
  if (!client || !client.topology || !client.topology.isConnected()) {
    try {
      client = new MongoClient(_url);
      await client.connect();
      db = client.db('Resilink');
      connectDB.info('Connected to MongoDB');
    } catch (error) {
      connectDB.error('Failed to connect to MongoDB', { error });
      throw error;
    }
  } else {
    connectDB.info('Reusing existing MongoDB connection');
  }
  return db;
};

module.exports = connectToDatabase;
