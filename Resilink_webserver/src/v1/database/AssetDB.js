const { MongoClient, ObjectId } = require('mongodb');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const newAssetDB = async (assetId, imgBase64, owner) => {
    try {
      console.log("try to connect to database");
      await client.connect();
      console.log("connection succesfull")
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('imgAsset');
  
  // Insert an asset with is imgpath. Can be empty if default image from mobile app selected
      console.log("before insertOne");
      await _collection.insertOne({
        "id": assetId,
        "owner": owner,
        "img": imgBase64
      });
      console.log("Document inséré avec succès!");
    } finally {
      await client.close();
    }
};

const getOneAssetDBimage = async (assetId) => {
  try {
    console.log("try to connect to database");
    await client.connect();
    console.log("connection succesfull")

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    const numericAssetId = parseInt(assetId);

    console.log(numericAssetId);
    const result = await _collection.findOne({ id: numericAssetId });

    if (result == null) {
      throw("image didn't find in the ")
    }
    console.log("Data retrieved:", result);

    return result;

  } finally {
    await client.close();
  }
};

const getAllAssetDBimage = async () => {
  try {
    console.log("try to connect to database");
    await client.connect();
    console.log("connection succesfull")

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    const numericAssetId = parseInt(assetId);

    console.log(numericAssetId);
    const result = await _collection.find({}).toArray();

    if (result == null || result.length === 0) {
      throw("Images not found")
    }
    console.log("Data retrieved:", result);

    return result;

  } finally {
    await client.close();
  }
}

//takes a list of assets as a parameter, retrieves the images linked to the assets if they exist, incorporates them into the asset and returns this list of assets
const getImageforAssets = async (ListAsset) => {
  try {
    console.log("Try to connect to the database");
    await client.connect();
    console.log("Connection successful");

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    for (const asset of ListAsset) {
      const numericAssetId = parseInt(asset.id);
      const result = await _collection.findOne({ id: numericAssetId });
      asset['image'] = result == null ? "" : result.img;
    }

    return ListAsset;

  } finally {
    await client.close();
  }
};

const deleteAssetImgById = async (assetId) => {
  try {
    await client.connect();
    console.log('Connecté à la base de données');

    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    const numericAssetId = parseInt(assetId);
    console.log(numericAssetId);
    const result = await _collection.deleteOne({ id: numericAssetId });

    if (result.deletedCount === 1) {
      console.log(`Document with ID ${assetId} successfully deleted`);
    } else {
      console.log(`Failed to delete document with ID ${assetId}/Image was non-existant`);
    }
  } finally {
    await client.close();
    console.log('Disconnected from database');
  }
}

const updateAssetImgById = async (assetId, assetImg) => {
  try {
    await client.connect();
    console.log('Connecté à la base de données');
    console.log(typeof assetImg);
    const _database = client.db('Resilink');
    const _collection = _database.collection('imgAsset');

    const numericAssetId = parseInt(assetId);

    const result = await _collection.updateOne(
      { id: numericAssetId },
      { $set: { img: assetImg } }
    );

    if (result.matchedCount === 1) {
      if (result.modifiedCount === 1) {
        console.log(`Document with ID ${assetId} successfully updated`);
      } else {
        console.log(`Document with ID ${assetId} found but value equal so not changed`);
      }
    } else {
      console.log(`Failed to find document with ID ${assetId}`);
    }
  } finally {
    await client.close();
    console.log('Disconnected from database');
  }
}
 
  module.exports = {
    newAssetDB,
    getOneAssetDBimage,
    getAllAssetDBimage,
    getImageforAssets,
    deleteAssetImgById,
    updateAssetImgById
}