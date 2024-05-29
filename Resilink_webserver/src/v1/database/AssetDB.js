const { MongoClient} = require('mongodb');
const { getDBError, InsertDBError, DeleteDBError, UpdateDBError } = require('../errors.js');

require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const deleteData = winston.loggers.get('DeleteDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection _url
const _url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(_url);


//Creates an asset in RESILINK DB 
const newAsset = async (assetId, imgBase64, owner, unit) => {
    try {
      console.log("in new Asset DB");
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'newAsset'});

      const _database = client.db('Resilink');
      const _collection = _database.collection('Asset');
  
      updateData.warn('before inserting data', { from: 'newAsset', data: {assetId: assetId, imgBase64: imgBase64, owner: owner}});

  // Insert an asset with is imgpath. Can be empty if default image from mobile app selected
      const asset = await _collection.insertOne({
        "id": assetId,
        "owner": owner,
        "img": imgBase64,
        "unit": unit ?? ""
      });

      if (asset == null) {
        throw new InsertDBError("asset not created in local DB")
      }  

      updateData.info('succes creating an asset in Resilink DB', { from: 'newAsset'});
      
    } catch (e) {
      if (e instanceof InsertDBError) {
        updateData.error('error creating an asset in Resilink DB', { from: 'newAsset'});
      } else {
        connectDB.error('error connecting to DB', { from: 'newAsset', error: e});
      }
      throw (e);
    } finally {
      await client.close();
    }
};

//Retrieves an asset with its ODEP id in RESLINK DB
const getAndCompleteOneAssetByAsset = async (asset) => {
  try {

    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getAndCompleteOneAssetByAsset'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('Asset');
    const numericAssetId = parseInt(asset["id"]);

    const result = await _collection.findOne({ id: numericAssetId });

    if (result == null) {
      throw new getDBError("asset didn't find in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving an asset in Resilink DB', { from: 'getAndCompleteOneAssetByAsset'});
    }

    asset["img"] = result["img"];

  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving an asset in Resilink DB', { from: 'getAndCompleteOneAssetByAsset'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getAndCompleteOneAssetByAsset',  error: e});
    }
  } finally {
    await client.close();
  }
};
//Retrieves an img with its asset id in RESILINK DB
const getOneAssetImageById = async (id) => {
  try {

    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getOneAssetImageById'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('Asset');
    const numericAssetId = parseInt(id);

    const result = await _collection.findOne({ id: numericAssetId });

    if (result == null) {
      throw new getDBError("asset didn't find in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving an asset in Resilink DB', { from: 'getOneAssetImageById'});
    }

    return result["img"];

  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving an asset in Resilink DB', { from: 'getOneAssetImageById'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getOneAssetImageById',  error: e});
    }
  } finally {
    await client.close();
  }
};

//Retrieves all asset in RESILINK DB
const getAllAsset = async () => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getAllAsset'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('Asset');

    const result = await _collection.find({}).toArray();

    if (result == null || result.length === 0) {
      throw new getDBError("assets didn't find in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving all assets in Resilink DB', { from: 'getAllAsset'});
    }

    return result;
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving all assets in Resilink DB', { from: 'getAllAsset'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getAllAsset',  error: e});
    }
    throw (e);
  } finally {
    await client.close();
  }
}

//takes a list of assets as a parameter, retrieves the images linked to the assets if they exist, incorporates them into the asset and returns this list of assets
const getAndCompleteAssetWithImgByAssets = async (ListAsset) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getAndCompleteAssetWithImgByAssets'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('Asset');

    for (const asset of ListAsset) {
      const numericAssetId = parseInt(asset.id);
      const result = await _collection.findOne({ id: numericAssetId });
      asset['image'] = result == null ? "" : result.img;
    }

    if (ListAsset == null) {
      throw new getDBError("assets didn't find / in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving/processing all assets in Resilink DB', { from: 'getAndCompleteAssetWithImgByAssets'});
    }

    return ListAsset;
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving/processing all assets in Resilink DB', { from: 'getAndCompleteAssetWithImgByAssets'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getAndCompleteAssetWithImgByAssets', error: e});
    }
  } finally {
    await client.close();
  }
};

//Deletes an asset by id in RESILINK DB
const deleteAssetById = async (assetId) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'deleteAssetById'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('Asset');

    const numericAssetId = parseInt(assetId);
    const result = await _collection.deleteOne({ id: numericAssetId });

    if (result.deletedCount === 1) {
      deleteData.info(`Document with ID ${assetId} successfully deleted`, { from: 'deleteAssetById'});
    } else {
      deleteData.error('error retrieving/processing all assets in Resilink DB', { from: 'deleteAssetById'});
      throw new DeleteDBError('error retrieving/processing all assets in Resilink DB');
    }

  } catch (e) {
    if (e instanceof DeleteDBError) {
      deleteData.error('error retrieving/processing all assets in Resilink DB', { from: 'deleteAssetById'});
    } else {
      connectDB.error('error connecting to DB', { from: 'deleteAssetById', error: e});
    }
  } finally {
    await client.close();
  }
}

//Update an asset by id in RESILINK DB
const updateAssetById = async (assetId, assetImg, asset) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'updateAssetById'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('Asset');

    const numericAssetId = parseInt(assetId);

    const result = await _collection.updateOne(
      { id: numericAssetId },
      { $set: { img: assetImg } }
    );

    if (result.matchedCount === 1) {
      if (result.modifiedCount === 1) {
        updateData.info(`Document with ID ${assetId} successfully updated`, { from: 'updateAssetById'});
      } else {
        updateData.info(`Document with ID ${assetId} found but value equal so not changed`, { from: 'updateAssetById'});
      }
      asset.image = result.img;
    } else {
      throw new UpdateDBError(`Failed to find document with ID ${assetId}`);
    }
  } catch (e) {
    if (e instanceof UpdateDBError) {
      updateData.error('error retrieving/processing all assets in Resilink DB', { from: 'updateAssetById'});
    } else {
      connectDB.error('error connecting to DB', { from: 'updateAssetById', error: e});
    }
  } finally {
    await client.close();
  }
}
 
  module.exports = {
    newAsset,
    getAndCompleteOneAssetByAsset,
    getOneAssetImageById,
    getAllAsset,
    getAndCompleteAssetWithImgByAssets,
    deleteAssetById,
    updateAssetById
}