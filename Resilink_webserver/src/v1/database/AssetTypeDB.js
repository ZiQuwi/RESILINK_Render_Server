const { MongoClient} = require('mongodb');
const { InsertDBError } = require('../errors.js'); 

require('../loggers.js');
const winston = require('winston');

const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url);

const newAssetTypeDB = async (assetType) => {
    try {
        console.log("newAssetTypeDB");
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'newAssetTypeDB'});
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('AssetTypeCounter');
  
      const existingDocument = await _collection.findOne({ assetType: assetType });
      
      updateData.warn('before inserting data', { from: 'newAssetTypeDB', data: assetType});
      console.log(assetType);

        if (existingDocument === null) {
            const assetType = await _collection.insertOne({
                "assetType": assetType,
                "count": 1
            });
            if (assetType == null) {
                throw InsertDBError("assetType not created in local DB")
            }  
            updateData.info('succes creating an assetType in Resilink DB', { from: 'newAssetTypeDB'});
            return `${assetType}1`;
        } else {
            // Mettre à jour le document en incrémentant le compteur
            const updatedDocument = await _collection.findOneAndUpdate(
                { assetType: assetType },
                { $inc: { count: 1 } }, // Incrémenter la valeur de "count" de 1
                { returnDocument: 'after' } // Renvoyer le document mis à jour
            );
            if (updatedDocument == null) {
                throw new InsertDBError("assetType not created in local DB")
            };
            updateData.info('succes updating counter of an assetType in Resilink DB', { from: 'newAssetTypeDB'});

            //const newCount = updatedDocument;
            return `${assetType}${updatedDocument["count"]}`; 
        }

    } catch (e) {
        if (e instanceof InsertDBError) {
            updateData.error('error creating/incrementing an assetType in Resilink DB', { from: 'newAssetTypeDB'});
          } else {
            connectDB.error('error connecting to DB', { from: 'newAssetTypeDB', error: e});
          }
    } finally {
      await client.close();
    }
};

module.exports = {
    newAssetTypeDB,
}