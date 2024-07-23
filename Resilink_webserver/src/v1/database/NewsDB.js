const { getDBError, InsertDBError, DeleteDBError } = require('../errors.js'); 
const connectToDatabase = require('./ConnectDB.js');

require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const deleteData = winston.loggers.get('DeleteDataResilinkLogger');

const createNews = async (url, country, institute, imgBase64, platform) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('News');

    const lastNews = await _collection.find().sort({ _id: -1 }).limit(1).toArray();

    var nextId = 1;

        if (lastNews.length !== 0) {
          const lastId = parseInt(lastNews[0]._id, 10);
          nextId += lastId
        }

    updateData.warn('before inserting data', { from: 'newNews', data: {url, country, institute, imgBase64, platform}});

    // Insert an News with its imgpath. Can be empty if default image from mobile app selected
    const news = await _collection.insertOne({
      "_id": nextId,
      "url": url,
      "country": country,
      "institute": institute,
      "img": imgBase64,
      "platform": platform
    });

    if (!news) {
      throw new InsertDBError("news not created in local DB");
    }  

    updateData.info('success creating a news in Resilink DB', { from: 'createNews' });

    return news;
  } catch (e) {
    if (e instanceof InsertDBError) {
      updateData.error('error creating a news in Resilink DB', { from: 'createNews' });
    } else {
      connectDB.error('error connecting to DB', { from: 'createNews', error: e });
    }
    throw e;
  }
};

// Retrieves the news account by a country in RESILINK DB
const getNewsfromCountry = async (country) => {
    try {
        const _database = await connectToDatabase();
        const _collection = _database.collection('News');
  
        const result = await _collection.find({ country: country.charAt(0).toUpperCase() + country.slice(1).toLowerCase() }).toArray();
    
        if (result == null) {
          throw new getDBError("no News in DB")
        }
        
        getDataLogger.info('succes retrieving all news from in Resilink DB', { from: 'getNewsfromCountry'});

        return result;
    
      } catch (e) {
        if (e instanceof getDBError) {
          getDataLogger.error('error retrieving all news in Resilink DB', { from: 'getNewsfromCountry'});
        } else {
          connectDB.error('error connecting to DB', { from: 'getNewsfromCountry',  error: e});
        }
        throw(e);
      }
};

// Retrieves a country's news account without those subscribed by the user from the RESILINK database.
const getNewsfromCountryWithoutUserNews = async (country, IdList) => {
  try {
      const db = await connectToDatabase();
      const _collection = db.collection('News');

      const result = await _collection.find({ 
        country: country.charAt(0).toUpperCase() + country.slice(1).toLowerCase(),
        _id: { $nin: IdList } 
      }).toArray();
  
      if (result == null) {
        throw new getDBError("no News in DB")
      }
      
      getDataLogger.info('succes retrieving all news from in Resilink DB', { from: 'getNewsfromCountryWithoutUserNews'});

      return result;
  
    } catch (e) {
      if (e instanceof getDBError) {
        getDataLogger.error('error retrieving all news in Resilink DB', { from: 'getNewsfromCountryWithoutUserNews'});
      } else {
        connectDB.error('error connecting to DB', { from: 'getNewsfromCountryWithoutUserNews',  error: e});
      }
      throw(e);
    }
};

// Retrieves the news account by an id list in RESILINK DB
const getNewsfromIdList = async (IdList) => {
  try {
      const _database = await connectToDatabase();
      const _collection = _database.collection('News');

      const result = await _collection.find({ _id: typeof IdList === 'string' ? IdList : { $in: IdList}}).toArray();

      if (result == null || (result.length === 0 && IdList.length === 0)) {
        throw new getDBError("no News in DB")
      }
      
      getDataLogger.info('succes retrieving all news from in Resilink DB', { from: 'getNewsfromIdList'});

      return result;
  
    } catch (e) {
      if (e instanceof getDBError) {
        getDataLogger.error('error retrieving all news in Resilink DB', { from: 'getNewsfromIdList'});
      } else {
        connectDB.error('error connecting to DB', { from: 'getNewsfromIdList',  error: e});
      }
      throw(e);
    }
};

// Deletes an News by id in RESILINK DB
const deleteNewsById = async (NewsId) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('News');

    const numericNewsId = parseInt(NewsId);
    const result = await _collection.deleteOne({ _id: numericNewsId });

    if (result.deletedCount === 1) {
      deleteData.info(`Document with ID ${NewsId} successfully deleted`, { from: 'deleteNewsById' });
      return {message: `news with ID ${NewsId} successfully deleted`};
    } else {
      deleteData.error('error deleting News in Resilink DB', { from: 'deleteNewsById' });
      throw new DeleteDBError('error deleting News in Resilink DB');
    }
  } catch (e) {
    if (e instanceof DeleteDBError) {
      deleteData.error('error deleting News in Resilink DB', { from: 'deleteNewsById' });
    } else {
      connectDB.error('error connecting to DB', { from: 'deleteNewsById', error: e });
    }
    throw e.message;
  }
};

module.exports = {
  createNews,
  getNewsfromCountry,
  getNewsfromIdList,
  getNewsfromCountryWithoutUserNews,
  deleteNewsById
}