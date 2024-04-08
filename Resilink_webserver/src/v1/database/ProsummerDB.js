const { MongoClient, ObjectId } = require('mongodb');
const { getDBError, UpdateDBError, InsertDBError, IDNotFoundError, DeleteDBError } = require('../errors.js'); 

require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');
const deleteData = winston.loggers.get('DeleteDataResilinkLogger')

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url);

//Retrieves all prosumers in RESILINK DB
const getAllProsummer = async (prosumerList) => {
    try {
        await client.connect();
        connectDB.info('succes connecting to DB', { from: 'getAllProsummer'});
    
        const _database = client.db('Resilink');
        const _collection = _database.collection('prosumer');
    
        for (var i = 0; i < prosumerList.length; i++) {
          var prosumers = await _collection.findOne({ _id : prosumerList[i].id });
          if (prosumers != null) {
            prosumerList[i].bookMarked = prosumers.bookMarked;
          }
        }

        getDataLogger.info('succes retrieving all prosummers in Resilink DB', { from: 'getAllProsummer'});

    } catch (e) {
      connectDB.error('error connecting to DB', { from: 'getAllProsummer',  error: e});
      throw(e);
    } finally {
        await client.close();
    }
};

//Retrieves one prosumer by its id
const getOneProsummer = async (prosumer) => {
    try {
        await client.connect();
        connectDB.info('succes connecting to DB', { from: 'getOneProsummer'});
    
        const _database = client.db('Resilink');
        const _collection = _database.collection('prosumer');
    
        const prosumers = await _collection.findOne({ _id: prosumer.id });

        if (prosumers == null || prosumers.length === 0) {
          /*
           * not exception possible for the moment, since not all the users had been registered in RESISILINK DB
          */
          //throw new getDBError("prosummer not found in DB")
          prosumer.bookMarked = [];
        } else {
          prosumer.bookMarked = prosumers.bookMarked;
        }
        getDataLogger.info('succes retrieving one prosummer in Resilink DB', { from: 'getOneProsummer'});
        return prosumers;
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

//Retrieves one prosumer by its id
const getOneProsummerWithUsername = async (prosumerName) => {
  try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'getBookmarkedProsumer'});
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('prosumer');
  
      const prosumers = await _collection.findOne({ _id: prosumerName });

      var bookMarkedList = [];
      if (prosumers == null || prosumers.length === 0) {
        /*
         * not exception possible for the moment, since not all the users had been registered in RESISILINK DB
        */
        //throw new getDBError("prosummer not found in DB")
      } else {
        bookMarkedList = [...prosumers.bookMarked];
      }
      getDataLogger.info('succes retrieving one prosummer in Resilink DB', { from: 'getBookmarkedProsumer'});
      return prosumers;
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving one prosummer in Resilink DB', { from: 'getBookmarkedProsumer'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getBookmarkedProsumer',  error: e});
    }
    throw(e);
  }finally {
      await client.close();
  }
}

// Creates a prosumer in RESILINK DB
const newProsumer = async (id) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'newProsumer'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('prosumer');

    updateData.info('data to insert', { from: 'newProsumer', _id: id});
    const prosumer = await _collection.insertOne({
      "_id": id,
      "bookMarked": []
    });

    if (prosumer == null) {
      throw new InsertDBError("prosummer not created in local DB")
    }
    
    updateData.info('succes creating one prosummer in Resilink DB', { from: 'newProsumer'});

  } catch (e){
    if (e instanceof InsertDBError) {
      updateData.error('error creating one prosummer in Resilink DB', { from: 'newProsumer'});
    } else {
      connectDB.error('error connecting to DB ', { from: 'newProsumer',  error: e});
    }
    throw(e);
  } finally {
    await client.close();
  }
};

// Update the bookMarked list from a prosumer to add a news id
const addbookmarked  = async (prosumerId, newId) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'addbookmarked'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('prosumer');

    // Check if the ID exists in the bookMarked list
    const prosumer = await _collection.findOne({ "_id": prosumerId, "bookMarked": { $in: [newId] } });
    if (prosumer) {
      throw new IDNotFoundError(`ID ${newId} already does exist in prosumer's bookMarked field`);
    }

    // Update the document to add the new ID to the 'bookMarked' field
    const result = await _collection.updateOne(
      { "_id": prosumerId },
      { $push: { "bookMarked": newId } }
    );

    if (result.modifiedCount !== 1) {
      throw new UpdateDBError("Failed to update prosumer's bookMarked field");
    }

    updateData.info('Success adding new ID to prosumer\'s bookMarked field', { from: 'addBookmarked' });

  } catch (e){
    if (e instanceof UpdateDBError) {
      updateData.error('error creating one prosummer in Resilink DB', { from: 'addbookmarked'});
    } else if (e instanceof IDNotFoundError) {
      updateData.error('id already exist in bookmarklist', { from: 'addbookmarked'});
    } else {
      connectDB.error('error connecting to DB ', { from: 'addbookmarked',  error: e});
    }
    throw(e);
  } finally {
    await client.close();
  }
};

// Update the bookMarked list from a prosumer to delete a news id
const deleteBookmarkedId  = async (id, owner) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'deleteBookmarkedId'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('prosumer');

    // Check if the ID exists in the bookMarked list
    const prosumer = await _collection.findOne({ "_id": owner, "bookMarked": { $in: [id] } });
    if (!prosumer) {
      throw new IDNotFoundError(`ID ${id} does not exist in prosumer's bookMarked field`);
    }

    // Update the document to remove the specified ID from the 'bookMarked' field
    const result = await _collection.updateOne(
      { "_id": owner },
      { $pull: { "bookMarked": id } }
    );

    if (result.modifiedCount !== 1) {
      throw new UpdateDBError("Failed to update prosumer's bookMarked field");
    }

    updateData.info('Success adding new ID to prosumer\'s bookMarked field', { from: 'deleteBookmarkedId' });

  } catch (e){
    if (e instanceof UpdateDBError) {
      updateData.error('error creating one prosummer in Resilink DB', { from: 'deleteBookmarkedId'});
    } else if (e instanceof IDNotFoundError) {
      updateData.error('id does\' not exist in bookmarklist', { from: 'deleteBookmarkedId'});
    } else {
      connectDB.error('error connecting to DB ', { from: 'deleteBookmarkedId',  error: e});
    }
    throw(e);
  } finally {
    await client.close();
  }
};

// Delete a prosumer in RESILINK DB
const deleteProsumerODEPRESILINK  = async (owner) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'deleteProsumerODEPRESILINK'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('prosumer');

    const prosumer = await _collection.deleteOne({ "_id": owner});

    if (prosumer.deletedCount === 1) {
      deleteData.info(`Document with ID ${owner} successfully deleted`, { from: 'deleteProsumerODEPRESILINK'});
    } else {
      throw new DeleteDBError('error deleting a prosumer in Resilink DB');
    }

  } catch (e){
    if (e instanceof DeleteDBError) {
      deleteData.error('error deleting one prosummer in Resilink DB', { from: 'deleteProsumerODEPRESILINK'});
    } else {
      deleteData.error('error connecting to DB ', { from: 'deleteProsumerODEPRESILINK',  error: e});
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
    getOneProsummerWithUsername,
    addbookmarked,
    deleteBookmarkedId,
    deleteProsumerODEPRESILINK
}