const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/players/", function (req, res, next) {
  req.body.result = 0;
  req.body.status = 3;
  next();
});

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    total: router.db.__wrapped__.players.length,
  });
};

server.use("/api", router);

// server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
