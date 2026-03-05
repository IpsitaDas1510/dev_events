const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://ipsitadas1510_db_user:srzlOLEYGayfSpFp@cluster0.ckybnun.mongodb.net/dev_events?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("dev_events").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);