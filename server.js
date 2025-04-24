import { App } from "./app.js";
import { logger } from "./middleware/logger.js";
import {requestTime} from "./middleware/requestTime.js";
import {errorMiddleware} from "./middleware/errorMiddleware.js";
import {jsonBodyParser} from "./middleware/bodyParser.js"

const port = 8080;
const hostname = "localhost";

const app = new App();

app.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'}).end('This is endpoint for "/" route.');
}, [logger]);

app.get("/home", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'}).end('This is response for endpoint "/home"');
}, [errorMiddleware]);

app.post("/register", (req, res) => {
    const userData = req.body;
    console.log("Form data:", userData);

    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: "User registered!", data: userData }));
}, [jsonBodyParser]);

app.get('/users/:userId/', (req, res) => {
   const {userId} = req.params;
   res.end(`User ID: ${userId}`);
});

app.get('/users/:userId/posts/:postId', (req, res) => {
    const {userId, postId} = req.params;
    res.end(`User ID: ${userId}, post ID: ${postId}`);
});


app.use(requestTime);

app.listen(port, hostname);