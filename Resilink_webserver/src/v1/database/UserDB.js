const { MongoClient, ObjectId } = require('mongodb');
const { getDBError, InsertDBError, DeleteDBError } = require('../errors.js'); 


require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');
const deleteData = winston.loggers.get('DeleteDataResilinkLogger');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url);

const getAllProsummer = async () => {
    try {
        await client.connect();
        connectDB.info('succes connecting to DB', { from: 'getAllProsummer'});
    
        const _database = client.db('Resilink');
        const _collection = _database.collection('prosummer');
    
        const prosumers = await _collection.find().toArray();

        if (result == null || result.length === 0) {
          throw new getDBError("no prosummer in DB found")
        }
        
        getDataLogger.info('succes retrieving all prosummers in Resilink DB', { from: 'getAllProsummer'});        
        
        return prosumers;
    } catch (e) {
      if (e instanceof getDBError) {
        getDataLogger.error('error retrieving all prosummers in Resilink DB', { from: 'getAllProsummer'});
      } else {
        connectDB.error('error connecting to DB', { from: 'getAllProsummer',  error: e});
      }
      throw(e);
    }
    finally {
        await client.close();
    }
};

// Function to insert a document in the "prosumer" collection
const newUser = async (user, password) => {
    try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'newUser'});
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('user');
  
      updateData.warn('before inserting data', { from: 'newUser', data: {user: user, password: password}});

  // Insert a document with a unique identifier and a telephone number
      const user = await _collection.insertOne({
        "_id": user["_id"],
        "whatsApp": user["whatsApp"] ?? "",
        "userName": user["userName"],
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "roleOfUser": user["roleOfUser"],
        "email": user["email"],
        "password": password,
        "provider": user["provider"],
        "account": user["account"],
        "createdAt": user["createdAt"],
        "updatedAt": user["updatedAt"]
      });

      if (user == null) {
        throw new InsertDBError("user not created in local DB")
      }  
      updateData.info('succes creating a user in Resilink DB', { from: 'newUser'});

    } catch (e) {
      if (e instanceof InsertDBError) {
        updateData.error('error creating an asset in Resilink DB', { from: 'newAssetDB'});
      } else {
        connectDB.error('error connecting to DB', { from: 'newAssetDB', error: e});
      }
      throw (e);
    } finally {
      await client.close();
    }
  };

  const deleteUser = async (userId) => {
    try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'deleteUser'});

      const _database = client.db('Resilink');
      const _collection = _database.collection('imgAsset');

      const result = await _collection.deleteOne({ _id: userId });

      if (result.deletedCount === 1) {
        deleteData.info(`Document with ID ${userId} successfully deleted`, { from: 'deleteUser'});
      } else {
        deleteData.error('error  delete user in Resilink DB', { from: 'deleteUser'});
        throw new DeleteDBError();
      }
    } catch (e) {
      if (e instanceof DeleteDBError) {
        deleteData.error('error delete user in Resilink DB', { from: 'deleteUser'});
      } else {
        connectDB.error('error connecting to DB', { from: 'deleteUser', error: e});
      }
    } finally {
      await client.close();
    }
  }

  module.exports = {
    getAllProsummer,
    newUser,
    deleteUser
  }