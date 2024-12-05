const { InsertDBError } = require('../errors.js'); 
const winston = require('winston');
const connectToDatabase = require('./ConnectDB.js');

require('../loggers.js');

const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');

// If the assetType does not exist, creates its entity in the database, otherwise updates the assetType counter.
const newAssetTypeDB = async (assetType) => {
    try {
      const _database = await connectToDatabase();
      const _collection = _database.collection('AssetTypeCounter');

      const existingDocument = await _collection.findOne({ assetType: assetType });
      updateData.warn('before inserting data', { from: 'newAssetTypeDB', data: assetType});

        if (existingDocument === null) {
            // Create a new document with the assetType
            const ResultassetType = await _collection.insertOne({
                "assetType": assetType,
                "count": 1
            });
            if (ResultassetType == null) {
                throw InsertDBError("assetType not created in local DB")
            }  
            updateData.info('succes creating an assetType in Resilink DB', { from: 'newAssetTypeDB'});
            return `${assetType}1`;
        } else {
            // Update the document by incrementing the counter
            const updatedDocument = await _collection.findOneAndUpdate(
                { assetType: assetType },
                { $inc: { count: 1 } }, 
                { returnDocument: 'after' } // Resend the updated document
            );
            if (updatedDocument == null) {
                throw new InsertDBError("assetType not created in local DB")
            };
            updateData.info('succes updating counter of an assetType in Resilink DB', { from: 'newAssetTypeDB'});

            return `${assetType}${updatedDocument["count"]}`; 
        }

    } catch (e) {
        if (e instanceof InsertDBError) {
            updateData.error('error creating/incrementing an assetType in Resilink DB', { from: 'newAssetTypeDB'});
        } else {
            connectDB.error('error connecting to DB', { from: 'newAssetTypeDB', error: e});
        }
        throw(e);
    }
};

module.exports = {
    newAssetTypeDB,
}