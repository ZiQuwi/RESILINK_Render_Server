const { MongoClient, ObjectId } = require('mongodb');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const getAllArticle = async () => {
    try {
        console.log("try to connect to database");
        await client.connect();
        console.log("connection succesfull")
    
        const _database = client.db('Resilink');
        const _collection = _database.collection('Article');
    
        const result = await _collection.find({}).toArray();
    
        if (result == null || result.length === 0) {
          throw("no Article in DB")
        }
        console.log("Data retrieved:", result);
        
        return result;
    
      } catch (e) {
        throw("can't retrieve data");
      } finally {
        await client.close();
      } 
};

const getLastFourArticles = async () => {
  try {
      console.log("try to connect to database");
      await client.connect();
      console.log("connection succesfull")
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('Article');
  
      const result = await _collection.find({}).sort({_id: -1}).limit(4).toArray();
  
      if (result == null || result.length === 0) {
        throw("no Article in DB")
      }
      console.log("Data retrieved:", result);
      
      return result;
  
    } catch (e) {
      throw("can't retrieve data");
    } finally {
      await client.close();
    } 
};

module.exports = {
    getAllArticle,
    getLastFourArticles
};