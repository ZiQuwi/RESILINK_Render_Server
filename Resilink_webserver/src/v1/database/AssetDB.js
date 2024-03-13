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

const newAssetDB = async (assetId, imgBase64, owner) => {
    try {
      await client.connect();
      connectDB.info('succes connecting to DB', { from: 'newAssetDB'});

      const _database = client.db('Resilink');
      const _collection = _database.collection('imgAsset');
  
      updateData.warn('before inserting data', { from: 'newAssetDB', data: {assetId: assetId, imgBase64: imgBase64, owner: owner}});

  // Insert an asset with is imgpath. Can be empty if default image from mobile app selected
      const asset = await _collection.insertOne({
        "id": assetId,
        "owner": owner,
        "img": imgBase64
      });

      if (asset == null) {
        throw new InsertDBError("asset not created in local DB")
      }  

      updateData.info('succes creating an asset in Resilink DB', { from: 'newAssetDB'});
      
    } catch (e) {
      if (e instanceof InsertDBError) {
        updateData.error('error creating an asset in Resilink DB', { from: 'newAssetDB'});
      } else {
        connectDB.error('error connecting to DB', { from: 'newAssetDB', error: e});
      }
      throw (e);
    } finally {
      await client.close();
    }
};

const getOneAssetDBimage = async (asset) => {
  try {

    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getOneAssetDBimage'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');
    const numericAssetId = parseInt(asset["id"]);

    const result = await _collection.findOne({ id: numericAssetId });

    if (result == null) {
      throw new getDBError("asset didn't find in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving an asset in Resilink DB', { from: 'getOneAssetDBimage'});
    }

    asset["img"] = result["img"];

  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving an asset in Resilink DB', { from: 'getOneAssetDBimage'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getOneAssetDBimage',  error: e});
    }
  } finally {
    await client.close();
  }
};

const getOneDBimageById = async (id) => {
  try {

    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getOneAssetDBimage'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');
    const numericAssetId = parseInt(id);

    const result = await _collection.findOne({ id: numericAssetId });

    if (result == null) {
      throw new getDBError("asset didn't find in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving an asset in Resilink DB', { from: 'getOneAssetDBimage'});
    }

    return result["img"];

  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving an asset in Resilink DB', { from: 'getOneAssetDBimage'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getOneAssetDBimage',  error: e});
    }
  } finally {
    await client.close();
  }
};

const getAllAssetDBimage = async () => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getAllAssetDBimage'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    const result = await _collection.find({}).toArray();

    if (result == null || result.length === 0) {
      throw new getDBError("assets didn't find in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving all assets in Resilink DB', { from: 'getAllAssetDBimage'});
    }

    return result;
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving all assets in Resilink DB', { from: 'getAllAssetDBimage'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getAllAssetDBimage',  error: e});
    }
    throw (e);
  } finally {
    await client.close();
  }
}

//takes a list of assets as a parameter, retrieves the images linked to the assets if they exist, incorporates them into the asset and returns this list of assets
const getImageforAssets = async (ListAsset) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'getImageforAssets'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    for (const asset of ListAsset) {
      const numericAssetId = parseInt(asset.id);
      const result = await _collection.findOne({ id: numericAssetId });
      asset['image'] = result == null ? "" : result.img;
    }

    if (ListAsset == null) {
      console.log("listasset: " + ListAsset);
      throw new getDBError("assets didn't find / in the Resilink DB");
    } else {
      getDataLogger.info('succes retrieving/processing all assets in Resilink DB', { from: 'getImageforAssets'});
    }

    return ListAsset;
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving/processing all assets in Resilink DB', { from: 'getImageforAssets'});
    } else {
      connectDB.error('error connecting to DB', { from: 'getImageforAssets', error: e});
    }
  } finally {
    await client.close();
  }
};

const deleteAssetImgById = async (assetId) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'deleteAssetImgById'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    const numericAssetId = parseInt(assetId);
    const result = await _collection.deleteOne({ id: numericAssetId });

    if (result.deletedCount === 1) {
      deleteData.info(`Document with ID ${assetId} successfully deleted`, { from: 'deleteAssetImgById'});
    } else {
      deleteData.error('error retrieving/processing all assets in Resilink DB', { from: 'deleteAssetImgById'});
      throw new DeleteDBError('error retrieving/processing all assets in Resilink DB');
    }
  } catch (e) {
    if (e instanceof DeleteDBError) {
      deleteData.error('error retrieving/processing all assets in Resilink DB', { from: 'deleteAssetImgById'});
    } else {
      connectDB.error('error connecting to DB', { from: 'deleteAssetImgById', error: e});
    }
  } finally {
    await client.close();
  }
}

const updateAssetImgById = async (assetId, assetImg) => {
  try {
    await client.connect();
    connectDB.info('succes connecting to DB', { from: 'updateAssetImgById'});

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    const numericAssetId = parseInt(assetId);

    const result = await _collection.updateOne(
      { id: numericAssetId },
      { $set: { img: assetImg } }
    );

    if (result.matchedCount === 1) {
      if (result.modifiedCount === 1) {
        updateData.info(`Document with ID ${assetId} successfully updated`, { from: 'updateAssetImgById'});
      } else {
        updateData.info(`Document with ID ${assetId} found but value equal so not changed`, { from: 'updateAssetImgById'});
      }
    } else {
      throw new UpdateDBError(`Failed to find document with ID ${assetId}`);
    }
  } catch (e) {
    if (e instanceof UpdateDBError) {
      updateData.error('error retrieving/processing all assets in Resilink DB', { from: 'updateAssetImgById'});
    } else {
      connectDB.error('error connecting to DB', { from: 'updateAssetImgById', error: e});
    }
  } finally {
    await client.close();
  }
}
 
  module.exports = {
    newAssetDB,
    getOneAssetDBimage,
    getOneDBimageById,
    getAllAssetDBimage,
    getImageforAssets,
    deleteAssetImgById,
    updateAssetImgById
}