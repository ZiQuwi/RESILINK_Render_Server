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

// Function to insert a document in the "prosumer" collection
const newUser = async (user, password) => {

    try {
      console.log("try to connect to database");
      await client.connect();
      console.log("connection succesfull")
  
      const _database = client.db('Resilink');
      const _collection = _database.collection('user');
  
  // Insert a document with a unique identifier and a telephone number
      console.log("before insertOne");
      await _collection.insertOne({
        "_id": user["_id"],
        "whatsApp": user["whatsApp"] ?? "",
        "userName": user["userName"],
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "roleOfUser": user["roleOfUser"],
        "email": user["email"],
        "password": password,
        "provider": user["provider"],
        "account": user["account"],
        "createdAt": user["createdAt"],
        "updatedAt": user["updatedAt"]
      });
      console.log("Document inséré avec succès!");
    } finally {
      await client.close();
    }
  };

  module.exports = {
    getAllProsummer,
    newUser
  }