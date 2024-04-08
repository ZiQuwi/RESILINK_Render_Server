const { MongoClient, ObjectId } = require('mongodb');
const { getDBError } = require('../errors.js'); 

require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url);

// Retrieves the news account by a country in RESILINK DB
const getNewsfromCountry = async (country) => {
    try {
        await client.connect();
        connectDB.info('succes connecting to DB', { from: 'getNewsfromCountry'});

        const _database = client.db('Resilink');
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
      } finally {
        await client.close();
      } 
};

// Retrieves a country's news account without those subscribed by the user from the RESILINK database.
const getNewsfromCountryWithoutUserNews = async (country, IdList) => {
  try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'getNewsfromCountryWithoutUserNews'});

      const _database = client.db('Resilink');
      const _collection = _database.collection('News');

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
    } finally {
      await client.close();
    } 
};

// Retrieves the news account by an id list in RESILINK DB
const getNewsfromIdList = async (IdList) => {
  try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'getNewsfromIdList'});

      const _database = client.db('Resilink');
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
    } finally {
      await client.close();
    } 
};

module.exports = {
  getNewsfromCountry,
  getNewsfromIdList,
  getNewsfromCountryWithoutUserNews,
}