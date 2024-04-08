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

//Retrieves all articles in RESILINK DB
const getAllArticle = async () => {
    try {
        await client.connect();
        connectDB.info('succes connecting to DB', { from: 'getAllArticle'});

        const _database = client.db('Resilink');
        const _collection = _database.collection('Article');
    
        const result = await _collection.find({}).toArray();
    
        if (result == null || result.length === 0) {
          throw new getDBError("no Article in DB")
        }
        
        getDataLogger.info('succes retrieving all articles in Resilink DB', { from: 'getAllArticle'});

        return result;
    
      } catch (e) {
        if (e instanceof getDBError) {
          getDataLogger.error('error retrieving all articles in Resilink DB', { from: 'getAllArticle'});
        } else {
          connectDB.error('error connecting to DB', { from: 'getAllArticle',  error: e});
        }
        throw(e);
      } finally {
        await client.close();
      } 
};

//Retrieves the last 4 registered articles
const getLastFourArticles = async () => {
  try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'getLastFourArticles'});
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('Article');
  
      const result = await _collection.find({}).sort({_id: -1}).limit(4).toArray();
  
      if (result == null || result.length === 0) {
        throw new getDBError("no Article in DB")
      }
      
      getDataLogger.info('succes retrieving all articles in Resilink DB', { from: 'getLastFourArticles'});
      
      return result;
  
    } catch (e) {
      if (e instanceof getDBError) {
        getDataLogger.error('error retrieving all articles in Resilink DB', { from: 'getLastFourArticles'});
      } else {
        connectDB.error('error connecting to DB', { from: 'getLastFourArticles',  error: e});
      }
      throw(e);
    } finally {
      await client.close();
    } 
};

module.exports = {
    getAllArticle,
    getLastFourArticles
};