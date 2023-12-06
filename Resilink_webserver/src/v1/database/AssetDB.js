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

    // Retourner le résultat ou faire d'autres opérations avec les données récupérées
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

    // Retourner le résultat ou faire d'autres opérations avec les données récupérées
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


  module.exports = {
    newAssetDB,
    getOneAssetDBimage,
    getAllAssetDBimage,
    getImageforAssets,
}