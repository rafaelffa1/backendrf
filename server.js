var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./app/swagger");
const { setupWebsocket } = require("./app/websocket");
const admin = require("firebase-admin");

const app = express();
const server = require("http").Server(app);

// var serviceAccount = require("./mercadomineiro-6fa9e-51540d8f41ea.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://mercadomineiro-6fa9e.firebaseio.com",
// });

setupWebsocket(server);

app.use((req, res, next) => {
  return next();
});

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(require("./app/router"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// var port = process.env.port || 3000
var port = process.env.port || 21243;
// var port2 = process.env.port || 8002
// io.listen(port2);
server.listen(port);
console.log("Iniciando a app na porta " + port);
