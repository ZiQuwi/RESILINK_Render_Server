const { getDBError, UpdateDBError, InsertDBError, IDNotFoundError, DeleteDBError } = require('../errors.js'); 
const connectToDatabase = require('./ConnectDB.js');

require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');
const deleteData = winston.loggers.get('DeleteDataResilinkLogger')

//Retrieves all prosumers in RESILINK DB
const getAllProsummer = async (prosumerList) => {
    try {
        const _database = await connectToDatabase();
        const _collection = _database.collection('prosumer');
    
        for (var i = 0; i < prosumerList.length; i++) {
          var prosumers = await _collection.findOne({ _id : prosumerList[i].id });
          if (prosumers != null) {
            prosumerList[i].bookMarked = prosumers.bookMarked;
            prosumerList[i].job = prosumers.job;
            prosumerList[i].location = prosumers.location;
          }
        }

        getDataLogger.info('succes retrieving all prosummers in Resilink DB', { from: 'getAllProsummer'});

    } catch (e) {
      connectDB.error('error connecting to DB', { from: 'getAllProsummer',  error: e});
      throw(e);
    }
};

//Retrieves one prosumer by the entity prosummer
const getOneProsummer = async (prosumer) => {
    try {
        const _database = await connectToDatabase();
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
          prosumer.job = prosumers.job;
          prosumer.location = prosumers.location;
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
    }
}

//Retrieves one prosumer by its username (id)
const getOneProsummerWithUsername = async (prosumerName) => {
  try {
      const _database = await connectToDatabase();
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
  }
}

// Retrieves a user by id in RESILINK DB
const getJobProsummer = async (id) => {
  try {
    const _database = await connectToDatabase();
    const _collection = _database.collection('prosumer');

    var job;
    var prosummer = await _collection.findOne({ _id: id });
    if (prosummer != null) {
      job = prosummer.job;
    } else {
      throw new getDBError();
    }

    getDataLogger.info('succes retrieving prosummer\'s job in Resilink DB', { from: 'getJobProsummer'});
    return job;

  } catch (e) {
    if (e instanceof getDBError) {
      updateData.error('error retrieving prosummer\'s job in Resilink DB', { from: 'getJobProsummer', error: e.message});
    } else {
      connectDB.error('error connecting to DB', { from: 'getJobProsummer', error: e.message});
    }
  }
}

// Creates a prosumer in RESILINK DB
const newProsumer = async (id, job, location) => {
  try {
    const _database = await connectToDatabase();
    const _collection = _database.collection('prosumer');

    updateData.info('data to insert', { from: 'newProsumer', _id: id, job: job});
    const prosumer = await _collection.insertOne({
      "_id": id,
      "bookMarked": [],
      "job": job,
      "location": location
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
  }
};

// Update the job from a prosumer
const updateJob  = async (prosumerId, job) => {
  try {
    const _database = await connectToDatabase();
    const _collection = _database.collection('prosumer');

    // Update the document to update the job
    const result = await _collection.updateOne(
      { "_id": prosumerId },
      { $set: { "job": job } }
    );

    if (result.matchedCount === 0) {
      throw new UpdateDBError("Prosumer not found");
    } else if (result.modifiedCount === 0) {
      updateData.info('The job value was the same, no update performed.', { from: 'updateJob' });
    } else {
      updateData.info('Success updating prosumer\'s job field', { from: 'updateJob' });
    }

  } catch (e){
    if (e instanceof UpdateDBError) {
      updateData.error('error updating job field in Resilink DB', { from: 'updateJob'});
    } else {
      connectDB.error('error connecting to DB ', { from: 'updateJob',  error: e});
    }
    throw(e);
  }
};

// Update the job from a prosumer
const updateLocation  = async (prosumerId, location) => {
  try {
    const _database = await connectToDatabase();
    const _collection = _database.collection('prosumer');

    // Update the document to update the job
    const result = await _collection.updateOne(
      { "_id": prosumerId },
      { $set: { "location": location } }
    );

    if (result.matchedCount === 0) {
      throw new UpdateDBError("Prosumer not found");
    } else if (result.modifiedCount === 0) {
      updateData.info('The location value was the same, no update performed.', { from: 'updateLocation' });
    } else {
      updateData.info('Success updating prosumer\'s location field', { from: 'updateLocation' });
    }

  } catch (e){
    if (e instanceof UpdateDBError) {
      updateData.error('error updating location field in Resilink DB', { from: 'updateLocation'});
    } else {
      connectDB.error('error connecting to DB ', { from: 'updateLocation',  error: e});
    }
    throw(e);
  }
};

// Update the bookMarked list from a prosumer to add a news id
const addbookmarked  = async (prosumerId, newId) => {
  try {
    const _database = await connectToDatabase();
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
  }
};

// Update the bookMarked list from a prosumer to delete a news id
const deleteBookmarkedId  = async (id, owner) => {
  try {
    const _database = await connectToDatabase();
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
  }
};

// Delete a prosumer in RESILINK DB
const deleteProsumerODEPRESILINK  = async (owner) => {
  try {
    const _database = await connectToDatabase();
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
  }
};



module.exports = {
    getAllProsummer,
    newProsumer,
    getOneProsummer,
    getOneProsummerWithUsername,
    updateJob,
    updateLocation,
    getJobProsummer,
    addbookmarked,
    deleteBookmarkedId,
    deleteProsumerODEPRESILINK
}