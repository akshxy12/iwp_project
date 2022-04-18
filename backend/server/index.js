require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 3001;

const App = express();
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(
    cors({
        origin: process.env.REACT_LOCATION,
    })
);

const client = new MongoClient(process.env.DB_CONNECT_URI);
async function connection_to_db() {
    await client
        .connect()
        .then(() => console.log("Database connection successful"))
        .catch((error) => console.log(`Database connection failed\n${error}`));
}

// Connecting to the database
connection_to_db();

// GET methods
App.get("/api/get_users", async (req, res) => {
    let result = await client.db(process.env.DB_NAME).collection(process.env.USER_COLLECTION).find({});
    let users = [];

    await result.forEach((user) => {
        users.push(user);
    });

    console.log(`[GET] Retrived all users from users collection`);

    res.json({users: users});
})

App.get("/api/get_user/:username", async (req, res) => {
    const result = await client.db(process.env.DB_NAME).collection(process.env.USER_COLLECTION).findOne({username: req.params.username});

    console.log(`[GET] Retrived ${req.params.username} user from the users collection`);
    res.json({result: result});
});

App.get("/api/get_spending_details/:username", async (req, res) => {
    const result = await client.db(process.env.DB_NAME).collection(process.env.SPENDING_DETAILS_COLLECTION).findOne({
        username: req.params.username
    });

    console.log(`[GET] Retrived spending details of user ${req.params.username}`);
    res.json({result: result});
})

App.get("/api/get_spending_records/:username", async (req, res) => {
    let result = await client.db(process.env.DB_NAME).collection(process.env.SPENDING_RECORD_COLLECTION).find({
        username: req.params.username
    });
    let records = [];

    await result.forEach((record) => records.push(record));

    console.log(`[GET] Retrieved spending records of user ${req.params.username}`);
    res.json({records: records});
})

// POST methods
App.post("/api/add_user/:username", async (req, res) => {
    const data = req.body;
    const result = await client.db(process.env.DB_NAME).collection(process.env.USER_COLLECTION).insertOne(data);

    console.log(`[POST] Added user details of user ${req.params.username}`);
    res.json({result: result});
})

App.post("/api/add_spending_records/:username", async (req, res) => {
    const data = req.body;
    const result = await client.db(process.env.DB_NAME).collection(process.env.SPENDING_RECORD_COLLECTION).insertOne(data);

    console.log(`[POST] Added spending details of ${req.params.username}`);
    res.json({result: result});
});

App.post("/api/add_spending_details/:username", async (req, res) => {
    const data = req.body;
    const result = await client.db(process.env.DB_NAME).collection(process.env.SPENDING_DETAILS_COLLECTION).insertOne(data);

    console.log(`[POST] Added spending details of user ${req.params.username}`);
    res.json({result: result});
})

App.post("/api/add_spending_records/:username", async (req, res) => {
    const data = req.body;
    let result = await client.db(process.env.DB_NAME).collection(process.env.SPENDING_RECORD_COLLECTION).insertOne(data);

    console.log(`[POST] Added spending records for user ${req.params.username}`);
    res.json({result: result});
})

// Starting the server
App.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
