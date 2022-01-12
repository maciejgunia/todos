import { Handler } from "@netlify/functions";
import { ObjectId } from "mongodb";
const { NetlifyJwtVerifier } = require("@serverless-jwt/netlify");

const verifyJwt = NetlifyJwtVerifier({
    issuer: "https://dev-boefz5w6.us.auth0.com/",
    audience: "https://dev-boefz5w6.us.auth0.com/api/v2/"
});
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "bd7tfidpxkvovkr";
let cachedDb = null;

const connectToDatabase = async (uri) => {
    // we can cache the access to our database to speed things up a bit
    // (this is the only thing that is safe to cache here)
    if (cachedDb) return cachedDb;

    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });

    cachedDb = client.db(DB_NAME);

    return cachedDb;
};

const pushToDatabase = async (db, data, userId) => {
    if (data.name) {
        await db.collection("todos").insertMany([{ ...data, userId }]);
        return { statusCode: 201 };
    } else {
        return { statusCode: 422 };
    }
};

const queryDatabase = async (db, userId) => {
    const todos = await db.collection("todos").find({ userId }).toArray();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todos)
    };
};

const removeFromDatabase = async (db, id, userId) => {
    await db.collection("todos").deleteOne({ _id: new ObjectId(id), userId });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        }
    };
};

const handler: Handler = verifyJwt(async (event, context) => {
    /// otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false;

    console.log(context, MONGODB_URI);
    const userId = context?.clientContext?.user?.sub;
    const db = await connectToDatabase(MONGODB_URI);

    switch (event.httpMethod) {
        case "GET":
            return queryDatabase(db, userId);
        case "POST":
            return pushToDatabase(db, JSON.parse(event.body), userId);
        case "DELETE":
            return removeFromDatabase(db, event.path.split("/")[4], userId);
        default:
            return { statusCode: 400 };
    }
});

export { handler };
