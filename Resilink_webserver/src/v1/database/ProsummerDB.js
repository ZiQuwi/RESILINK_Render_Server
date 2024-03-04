const { MongoClient, ObjectId } = require('mongodb');
const { getDBError, UpdateDBError } = require('../errors.js'); 

require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');

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

        if (prosumers == null || prosumers.length === 0) {
          throw new getDBError("no prosummers in DB")
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
    } finally {
        await client.close();
    }
};

const getOneProsummer = async (id) => {
    try {
        await client.connect();
        connectDB.info('succes connecting to DB', { from: 'getOneProsummer'});
    
        const _database = client.db('Resilink');
        const _collection = _database.collection('prosumer');
    
        const prosumer = await _collection.findOne({ _id: new ObjectId(id) });

        if (prosumer == null || prosumer.length === 0) {
          throw new getDBError("prosummer not found in DB")
        }
        
        getDataLogger.info('succes retrieving one prosummer in Resilink DB', { from: 'getOneProsummer'});

        return prosumer;
    } catch (e) {
      if (e instanceof getDBError) {
        getDataLogger.error('error retrieving one prosummer in Resilink DB', { from: 'getOneProsummer'});
      } else {
        connectDB.error('error connecting to DB', { from: 'getOneProsummer',  error: e});
      }
      throw(e);
    }finally {
        await client.close();
    }
}

// Function to insert a document in the "prosumer" collection
const newProsumer = async (id, numero_tel) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getOneProsummer'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('prosumer');

// Insert a document with a unique identifier and a telephone number
    updateData.info('data to insert', { from: 'getOneProsummer', data: [id, numero_tel]});
    const prosumer = await _collection.insertOne({
      "_id": id,
      ...(numero_tel !== null && { "numero_tel": numero_tel })
    });

    if (prosumer == null) {
      throw new InsertDBError("prosummer not created in local DB")
    }
    
    updateData.info('succes creating one prosummer in Resilink DB', { from: 'getOneProsummer'});

  } catch (e){
    if (e instanceof InsertDBError) {
      updateData.error('error creating one prosummer in Resilink DB', { from: 'getOneProsummer'});
    } else {
      connectDB.error('error connecting to DB ', { from: 'getOneProsummer',  error: e});
    }
    throw(e);
  } finally {
    await client.close();
  }
};

// Function to insert a document in the "prosumer" collection
const addbookmarked  = async (prosumerId, newId) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'addbookmarked'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('prosumer');

    console.log("etape 2 : avant mongoDB push")
    // Update the document to add the new ID to the 'bookMarked' field
    const result = await _collection.updateOne(
      { "_id": prosumerId },
      { $push: { "bookMarked": newId } }
    );

    console.log("etape 3 : apres mongoDB push");


    if (result.modifiedCount !== 1) {
      throw new UpdateDBError("Failed to update prosumer's bookMarked field");
    }

    updateData.info('Success adding new ID to prosumer\'s bookMarked field', { from: 'addBookmarked' });

  } catch (e){
    if (e instanceof UpdateDBError) {
      updateData.error('error creating one prosummer in Resilink DB', { from: 'addbookmarked'});
    } else {
      connectDB.error('error connecting to DB ', { from: 'addbookmarked',  error: e});
    }
    throw(e);
  } finally {
    await client.close();
  }
};

module.exports = {
    getAllProsummer,
    newProsumer,
    getOneProsummer,
    addbookmarked
}