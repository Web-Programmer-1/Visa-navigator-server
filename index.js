require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 7000;

// !middlewre
app.use(cors());
app.use(express.json());




// const uri = mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oaguo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hakimdev.zammz.mongodb.net/?retryWrites=true&w=majority&appName=HakimDev`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {


    
const visaCollection = client.db("visaDB").collection("Visas");
const userCollection = client.db("visaDB").collection("users");
const myVisaApplicatioCollection = client
  .db("visaDB")
  .collection("myApplication");

app.post("/myApplication", async (req, res) => {
  const myAppyVisa = req.body;
  const result = await myVisaApplicatioCollection.insertOne(myAppyVisa);
  res.send(result);
});
app.get("/myApplication", async (req, res) => {
  const result = await myVisaApplicatioCollection
    .find()
    .sort({ _id: -1 })
    .toArray();
  res.send(result);
});
app.delete("/myApplication/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await myVisaApplicatioCollection.deleteOne(query);
  res.send(result);
});
app.post("/visas", async (req, res) => {
  const visa = req.body;
  const result = await visaCollection.insertOne(visa);
  res.send(result);
});
app.delete("/visas/:email/:id", async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  const query = { email: email, _id: new ObjectId(id) };
  const result = await visaCollection.deleteOne(query);
  res.send(result);
});
app.put("/visas/:email/:id", async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  const query = { email: email, _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedVisa = req.body;
  const visa = {
    $set: {
      selectedDocuments: updatedVisa.selectedDocuments,
      countryImg: updatedVisa.countryImg,
      countryName: updatedVisa.countryName,
      Visa_type: updatedVisa.Visa_type,
      Processing_time: updatedVisa.Processing_time,
      Age_restriction: updatedVisa.Age_restriction,
      Fee: updatedVisa.Fee,
      Validity: updatedVisa.Validity,
      Description: updatedVisa.Description,
      application_method: updatedVisa.application_method,
      name: updatedVisa.name,
      email: updatedVisa.email,
    },
  };
  const result = await visaCollection.updateOne(query, visa, options);
  res.send(result);
});
app.post("/users", async (req, res) => {
  const user = req.body;
  const result = await userCollection.insertOne(user);
  res.send(result);
});
app.get("/users", async (req, res) => {
  const result = await userCollection.find().sort({ _id: -1 }).toArray();
  res.send(result);
});
app.get("/visas", async (req, res) => {
  const result = await visaCollection.find().sort({ _id: -1 }).toArray();
  res.send(result);
});
app.get("/visas/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await visaCollection.findOne(query);
  res.send(result);
});





    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully! connected to MongoDB!"
    // );
  } finally {

  }
}




run().catch(console.dir);






app.get("/", async (req, res) => {
  res.send("Allahu Akbar! Alhamdulillah All is Ok!");
});

app.listen(port, () => {
  console.log(`The Visa Quest Server Is Running At The Port : ${port}`);
});




























