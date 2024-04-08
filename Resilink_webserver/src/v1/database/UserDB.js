const { MongoClient, ObjectId } = require('mongodb');
const { getDBError, InsertDBError, DeleteDBError, UpdateDBError } = require('../errors.js'); 


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

// Creates a user in RESILINK DB
const newUser = async (user, password) => {
    try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'newUser'});
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('user');
  
      updateData.warn('before inserting data', { from: 'newUser', data: {user: user, password: password, phoneNumber: user["phoneNumber"] ?? ""}});
      
  // Inserts a document with a unique identifier and a telephone number
      const userCtreated = await _collection.insertOne({
        "_id": user["_id"],
        "phoneNumber": user["phoneNumber"] ?? "",
        "userName": user["userName"],
        "password": password,
      });

      if (userCtreated == null) {
        throw new InsertDBError("user not created in local DB")
      }  
      updateData.info('succes creating a user in Resilink DB', { from: 'newUser'});

    } catch (e) {
      if (e instanceof InsertDBError) {
        updateData.error('error creating an asset in Resilink DB', { from: 'newAssetDB'});
      } else {
        connectDB.error('error connecting to DB', { from: 'newAssetDB', error: e.message});
      }
      throw (e);
    } finally {
      await client.close();
    }
  };

// Deletes a user by id in RESILINK DB
const deleteUser = async (userId) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'deleteUser'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('user');

    const result = await _collection.deleteOne({ _id: userId });

    if (result.deletedCount === 1) {
      deleteData.info(`Document with ID ${userId} successfully deleted`, { from: 'deleteUser'});
    } else {
      throw new DeleteDBError();
    }
  } catch (e) {
    if (e instanceof DeleteDBError) {
      deleteData.error('error delete user in Resilink DB', { from: 'deleteUser', error: e.message});
    } else {
      connectDB.error('error connecting to DB', { from: 'deleteUser', error: e.message});
    }
  } finally {
    await client.close();
  }
}

// Updates a user by id in RESILINK DB
const updateUser = async (id, body) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'updateUser'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('user');

    updateData.warn('before updating data', { from: 'updateUser', data: {user: user, password: body.password, phoneNumber: body.phoneNumber ?? ""}});

    const result = await _collection.updateOne(
      { _id: id },
      { $set: { password: body.password, phoneNumber: body.phoneNumber ?? "" } }
    );

    if (result.modifiedCount === 1) {
      updateData.info(`Document with ID ${userId} successfully updated`, { from: 'updateUser'});
    } else {
      throw new UpdateDBError();
    }
  } catch (e) {
    if (e instanceof UpdateDBError) {
      updateData.error('error updating user in Resilink DB', { from: 'updateUser', error: e.message});
    } else {
      connectDB.error('error connecting to DB', { from: 'updateUser', error: e.message});
    }
  } finally {
    await client.close();
  }
}

// Retrieves a user by id in RESILINK DB
const getUser = async (id, body) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getUser'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('user');

    var user = await _collection.findOne({ _id: id });
    if (user != null) {
      body[i].phoneNumber = user.phoneNumber;
    } else {
      throw new getDBError();
    }

    getDataLogger.info('succes retrieving an user in Resilink DB', { from: 'getUser'});

  } catch (e) {
    if (e instanceof getDBError) {
      updateData.error('error retrieving user in Resilink DB', { from: 'getUser', error: e.message});
    } else {
      connectDB.error('error connecting to DB', { from: 'getUser', error: e.message});
    }
  } finally {
    await client.close();
  }
}

// Retrieves all users in RESILINK DB
const getAllUser = async (userList) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getAllUser'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('user');

    for (var i = 0; i < userList.length; i++) {
      var user = await _collection.findOne({ _id : userList[i]._id });
      if (user != null) {
        userList[i].phoneNumber = user.phoneNumber;
      } else {
        userList[i].phoneNumber = "";
      }
    }

    getDataLogger.info('succes retrieving all user in Resilink DB', { from: 'getAllUser'});

  } catch (e) {
    if (e instanceof getDBError) {
      updateData.error('error retrieving user in Resilink DB', { from: 'getAllUser', error: e.message});
    } else {
      connectDB.error('error connecting to DB', { from: 'getAllUser', error: e.message});
    }
  } finally {
    await client.close();
  }
}

module.exports = {
  newUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUser
}