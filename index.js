
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
// Use Middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.guzoq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);
console.log('database connected ');

async function run() {
    try {
        client.connect();
        const toolsCollection = client.db("green-garden-tools").collection("tools");

        // Get Tools
        app.get('/tool', async (req, res) => {
            const query = {};
            const tools = await toolsCollection.find().toArray();
            res.send(tools);

            app.get('/tool/:id', async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const tools = await toolsCollection.findOne(query);
                res.send(tools);
            })
        })

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Green Garden tools server is running');
})
app.listen(port, (req, res) => {
    console.log('server is running');
})