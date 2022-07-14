
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
        const ordersCollection = client.db("green-garden-tools").collection("orders");
        const reviewsCollection = client.db("green-garden-tools").collection("reviews");


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
            // Post order
            app.post('/order', async (req, res) => {
                const orders = req.body;
                const result = await ordersCollection.insertOne(orders);
                res.send(result);

            })

            // Get order use React query

            app.get('/order', async (req, res) => {
                const customer = req.query.customer;
                const query = { customer: customer };
                const orders = await ordersCollection.find(query).toArray();
                res.send(orders);
            })

            // Delete Order
            app.delete('/order/:id', async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const result = await ordersCollection.deleteOne(query);
                res.send(result);
            })
            // Post Review
            app.post('/review', async (req, res) => {
                const review = req.body;
                const result = await reviewsCollection.insertOne(review);
                res.send(result);
            })

            // Get Review

            app.get('/review', async (req, res) => {
                const query = {};
                const reviews = await reviewsCollection.find().toArray();
                res.send(reviews);
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