const { MongoClient, ObjectId } = require('mongodb');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const newAssetTypeDB = async (assetType) => {
    try {
      console.log("try to connect to database");
      await client.connect();
      console.log("connection succesfull")
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('AssetTypeCounter');
  
      const existingDocument = await _collection.findOne({ assetType: assetType });

        if (existingDocument === null) {
            console.log("before insertOne");
            await _collection.insertOne({
                "assetType": assetType,
                "count": 1
            });
            console.log("Document successfully inserted!");
            return `${assetType}1`;
        } else {
            console.log("AssetType found. Updating count.");

            // Mettre à jour le document en incrémentant le compteur
            const updatedDocument = await _collection.findOneAndUpdate(
                { assetType: assetType },
                { $inc: { count: 1 } }, // Incrémenter la valeur de "count" de 1
                { returnDocument: 'after' } // Renvoyer le document mis à jour
            );

            const newCount = updatedDocument;
            console.log("Document updated. New count:", newCount["count"]);
            console.log(`${assetType}${newCount["count"]}`);

            return `${assetType}${newCount["count"]}`; 
        }

      
    } finally {
      await client.close();
    }
};

module.exports = {
    newAssetTypeDB,
}