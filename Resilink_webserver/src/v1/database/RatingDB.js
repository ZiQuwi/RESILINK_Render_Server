const { getDBError, InsertDBError, DeleteDBError } = require('../errors.js'); 
const connectToDatabase = require('./ConnectDB.js');

require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const deleteData = winston.loggers.get('DeleteDataResilinkLogger');

const createNewRating = async (userId, Rating) => {
    try {
      const db = await connectToDatabase();
      const _collection = db.collection('Rating');
  
      updateData.warn('before inserting data', { from: 'createNewRating', data: {url, country, institute, imgBase64, platform}});
      const existingDocument = await _collection.findOne({ assetType: assetType });

      if (existingDocument === null) {
        throw new InsertDBError("user already had ratingd");
      }

      // Insert an News with its imgpath. Can be empty if default image from mobile app selected
      const newRating = await _collection.insertOne({
        "userId": userId,
        "Rating": Rating
      });
  
      if (!newRating) {
        throw new InsertDBError("Rating not created in local DB");
      }  
  
      updateData.info('success adding a Rating', { from: 'createNewRating' });
  
      return news;
    } catch (e) {
      if (e instanceof InsertDBError) {
        updateData.error('error adding a Rating', { from: 'createNewRating' });
      } else {
        connectDB.error('error connecting to DB', { from: 'createNewRating', error: e });
      }
      throw e;
    }
};

const updateRating = async (userId, Rating) => {
    try {
      const db = await connectToDatabase();
      const _collection = db.collection('Rating');
  
      updateData.warn('before updating news', { from: 'updateRating', data: body });
  
      // Update fields in the 'News' collection
      const result = await _collection.updateOne(
        { "userId": userId },
        { $set: {"Rating": Rating} } 
      );
  
      if (result.matchedCount === 0) {
        throw new Error(`No Rating found with userID ${id}`);
      }
  
      if (result.modifiedCount === 0) {
        throw new Error(`no update made with usrId ${id}`);
      }
  
      updateData.info('success updating Rating', { from: 'updateRating', updatedData: body });
  
    } catch (e) {
      updateData.error('error updating Rating', { from: 'updateRating', error: e.message });
      throw e;
    }
}; 

// Retrieves all Rating
const getAllRating = async () => {
    try {
        const _database = await connectToDatabase();
        const _collection = _database.collection('Rating');
  
        const result = await _collection.find({}).toArray();
    
        if (result == null) {
          throw new getDBError("no rating in DB")
        }
        
        getDataLogger.info('succes retrieving all rating', { from: 'getAllRating'});
  
        return result;
      } catch (e) {
        if (e instanceof getDBError) {
          getDataLogger.error('error retrieving all rating', { from: 'getAllRating'});
        } else {
          connectDB.error('error connecting to DB', { from: 'getAllRating',  error: e});
        }
        throw(e);
      }
  };

// Deletes a Rating by userId 
const deleteRatingByUserId = async (userId) => {
    try {
      const db = await connectToDatabase();
      const _collection = db.collection('Rating');
  
      const numericUserId = parseInt(userId);
      const result = await _collection.deleteOne({ userId: numericUserId });
  
      if (result.deletedCount === 1) {
        deleteData.info(`Document by userID ${NewsId} successfully deleted`, { from: 'deleteRatingByUserId' });
        return {message: `Rating by userID ${NewsId} successfully deleted`};
      } else {
        deleteData.error('error deleting Rating', { from: 'deleteRatingByUserId' });
        throw new DeleteDBError('error deleting Rating');
      }
  
    } catch (e) {
      if (e instanceof DeleteDBError) {
        deleteData.error('error deleting Rating', { from: 'deleteRatingByUserId' });
      } else {
        connectDB.error('error connecting to DB', { from: 'deleteRatingByUserId', error: e });
      }
      throw e.message;
    }
};