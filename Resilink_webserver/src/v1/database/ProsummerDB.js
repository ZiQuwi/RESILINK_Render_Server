const { MongoClient, ObjectId } = require('mongodb');

//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const getAllProsummer = async () => {
    try {
        console.log("try to connect to database");
        await client.connect();
        console.log("connection succesfull")
    
        const _database = client.db('Resilink');
        const _collection = _database.collection('prosummer');
    
        console.log("before findall");
        const prosumers = await _collection.find().toArray();
        console.log("process to findAll");
        return prosumers;
    } finally {
        await client.close();
    }
};

const getOneProsummer = async (id) => {
    try {
        console.log("try to connect to database");
        await client.connect();
        console.log("connection succesfull")
    
        const _database = client.db('Resilink');
        const _collection = _database.collection('prosumer');
    
        console.log("before findOne");
        const prosumer = await _collection.findOne({ _id: new ObjectId(id) });
        console.log("process to findOne");
        console.log("type variable prosumer: " + typeof prosumer);
        console.log("value variable prosumer: " + prosumer);
        return prosumer;
    } finally {
        await client.close();
    }
}

// Function to insert a document in the "prosumer" collection
const newProsumer = async (id, numero_tel) => {

  try {
    console.log("try to connect to database");
    await client.connect();
    console.log("connection succesfull")

    const _database = client.db('Resilink');
    const _collection = _database.collection('prosumer');

// Insert a document with a unique identifier and a telephone number
    console.log("before insertOne");
    await _collection.insertOne({
      "_id": id,
      ...(numero_tel !== null && { "numero_tel": numero_tel })
    });

    console.log("Document inséré avec succès!");
  } finally {
    await client.close();
  }
};

module.exports = {
    getAllProsummer,
    newProsumer,
    getOneProsummer
}