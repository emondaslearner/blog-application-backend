require('dotenv').config();
const app = require('./app');
const http = require('http');
const connectDB = require('./db');

const server = http.createServer(app);
const port = process.env.PORT || 5000;


const main = async () => {
    try {
        await connectDB();
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    } catch(e) {
        console.log(e.message);
    }
}

main();
