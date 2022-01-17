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

const createTodo = async (db, data, userId) => {
    if (data.name) {
        await db.collection("todos").insertMany([{ ...data, userId }]);
        return { statusCode: 201 };
    } else {
        return { statusCode: 422 };
    }
};

const getTodos = async (db, userId) => {
    const todos = await db.collection("todos").find({ userId }).toArray();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todos)
    };
};

const removeTodo = async (db, id, userId) => {
    await db.collection("todos").deleteOne({ _id: new ObjectId(id), userId });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        }
    };
};

const updateTodo = async (db, id, userId, data) => {
    await db.collection("todos").replaceOne({ _id: new ObjectId(id), userId }, { ...data, userId });

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

    const userId = context?.identityContext?.claims?.sub;
    const db = await connectToDatabase(MONGODB_URI);

    switch (event.httpMethod) {
        case "GET":
            return getTodos(db, userId);
        case "POST":
            return createTodo(db, JSON.parse(event.body), userId);
        case "PUT":
            return updateTodo(db, event.path.split("/")[4], userId, JSON.parse(event.body));
        case "DELETE":
            return removeTodo(db, event.path.split("/")[4], userId);
        default:
            return { statusCode: 400 };
    }
});

export { handler };
