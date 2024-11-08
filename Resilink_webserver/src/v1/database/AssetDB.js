const { getDBError, InsertDBError, DeleteDBError, UpdateDBError } = require('../errors.js');
const winston = require('winston');
const connectToDatabase = require('./ConnectDB.js');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateData = winston.loggers.get('UpdateDataResilinkLogger');
const deleteData = winston.loggers.get('DeleteDataResilinkLogger');
const connectDB = winston.loggers.get('ConnectDBResilinkLogger');

// Creates an asset in RESILINK DB 
const newAsset = async (assetId, imgBase64, owner, unit) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('Asset');
    updateData.warn('before inserting data', { from: 'newAsset', data: {assetId, imgBase64, owner}});

    // Insert an asset with its imgpath. Can be empty if default image from mobile app selected
    const asset = await _collection.insertOne({
      "id": assetId,
      "owner": owner, 
      "images": imgBase64,
      "unit": unit ?? ""
    });

    if (!asset) {
      throw new InsertDBError("asset not created in local DB");
    }  

    updateData.info('success creating an asset in Resilink DB', { from: 'newAsset' });
  } catch (e) {
    if (e instanceof InsertDBError) {
      updateData.error('error creating an asset in Resilink DB', { from: 'newAsset' });
    } else {
      connectDB.error('error connecting to DB', { from: 'newAsset', error: e });
    }
    throw e;
  }
};

// Retrieves an asset with its ODEP id in RESLINK DB
const getAndCompleteOneAssetByAsset = async (asset) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('Asset');
    const numericAssetId = parseInt(asset["id"]);

    const result = await _collection.findOne({ id: numericAssetId });

    if (!result) {
      throw new getDBError("asset didn't find in the Resilink DB");
    } else {
      getDataLogger.info('success retrieving an asset in Resilink DB', { from: 'getAndCompleteOneAssetByAsset' });
    }

    asset["images"] = result["images"];
    asset["unit"] = result["unit"];
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving an asset in Resilink DB', { from: 'getAndCompleteOneAssetByAsset' });
    } else {
      connectDB.error('error connecting to DB', { from: 'getAndCompleteOneAssetByAsset', error: e });
    }
    throw e;
  }
};

// Retrieves an img with its asset id in RESILINK DB
const getOneAssetImageById = async (id) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('Asset');
    const numericAssetId = parseInt(id);

    const result = await _collection.findOne({ id: numericAssetId });

    if (!result) {
      throw new getDBError("asset didn't find in the Resilink DB");
    } else {
      getDataLogger.info('success retrieving an asset in Resilink DB', { from: 'getOneAssetImageById' });
    }

    return result["images"];
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving an asset in Resilink DB', { from: 'getOneAssetImageById' });
    } else {
      connectDB.error('error connecting to DB', { from: 'getOneAssetImageById', error: e });
    }
    throw e;
  }
};

// Retrieves all assets in RESILINK DB
const getAllAsset = async () => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('Asset');

    const result = await _collection.find({}).toArray();

    if (!result || result.length === 0) {
      throw new getDBError("assets didn't find in the Resilink DB");
    } else {
      getDataLogger.info('success retrieving all assets in Resilink DB', { from: 'getAllAsset' });
    }

    return result;
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving all assets in Resilink DB', { from: 'getAllAsset' });
    } else {
      connectDB.error('error connecting to DB', { from: 'getAllAsset', error: e });
    }
    throw e;
  }
};

// Retrieves and completes assets with images by assets
const getAndCompleteAssetByAssets = async (ListAsset) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('Asset');

    for (const asset of ListAsset) {
      const numericAssetId = parseInt(asset.id);
      const result = await _collection.findOne({ id: numericAssetId });
      if (result != null) {
        asset['images'] = result.images != null ? result.images : [];
        asset['unit'] = result['unit'];
      }
    }

    if (!ListAsset) {
      throw new getDBError("assets didn't find / in the Resilink DB");
    } else {
      getDataLogger.info('success retrieving/processing all assets in Resilink DB', { from: 'getAndCompleteAssetWithImgByAssets' });
    }

    return ListAsset;
  } catch (e) {
    if (e instanceof getDBError) {
      getDataLogger.error('error retrieving/processing all assets in Resilink DB', { from: 'getAndCompleteAssetWithImgByAssets' });
    } else {
      connectDB.error('error connecting to DB', { from: 'getAndCompleteAssetWithImgByAssets', error: e });
    }
    throw e;
  }
};

// Deletes an asset by id in RESILINK DB
const deleteAssetById = async (assetId) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('Asset');

    const numericAssetId = parseInt(assetId);
    const result = await _collection.deleteOne({ id: numericAssetId });

    if (result.deletedCount === 1) {
      deleteData.info(`Document with ID ${assetId} successfully deleted`, { from: 'deleteAssetById' });
    } else {
      deleteData.error('error deleting asset in Resilink DB', { from: 'deleteAssetById' });
      throw new DeleteDBError('error deleting asset in Resilink DB');
    }
  } catch (e) {
    if (e instanceof DeleteDBError) {
      deleteData.error('error deleting asset in Resilink DB', { from: 'deleteAssetById' });
    } else {
      connectDB.error('error connecting to DB', { from: 'deleteAssetById', error: e });
    }
    throw e;
  }
};

// Updates an asset by id in RESILINK DB
const updateAssetById = async (assetId, assetImg, asset, unit) => {
  try {
    const db = await connectToDatabase();
    const _collection = db.collection('Asset');

    const numericAssetId = parseInt(assetId);

    const result = await _collection.updateOne(
      { id: numericAssetId },
      { $set: { images: assetImg, unit: unit} }
    );

    if (result.matchedCount === 1) {
      if (result.modifiedCount === 1) {
        updateData.info(`Document with ID ${assetId} successfully updated`, { from: 'updateAssetById' });
      } else {
        updateData.info(`Document with ID ${assetId} found but value unchanged`, { from: 'updateAssetById' });
      }
      asset.images = result.images;
    } else {
      throw new UpdateDBError(`Failed to find document with ID ${assetId}`);
    }
  } catch (e) {
    if (e instanceof UpdateDBError) {
      updateData.error('error updating asset in Resilink DB', { from: 'updateAssetById' });
    } else {
      connectDB.error('error connecting to DB', { from: 'updateAssetById', error: e });
    }
    throw e;
  }
};

module.exports = {
  newAsset,
  getAndCompleteOneAssetByAsset,
  getOneAssetImageById,
  getAllAsset,
  getAndCompleteAssetByAssets,
  deleteAssetById,
  updateAssetById
};
