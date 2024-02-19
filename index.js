//Server side
import express, { urlencoded } from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import weatherJs from "weather-js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  //accesses the html file
  res.sendFile(join(__dirname, "index.html"));
});

app.use(express.static("public"));

const postStorage = [];
const connections = {};
const glenEdenRating = [];

let average = 0;
let sum = 0;

io.on("connection", (socket) => {
  //on connection to socket, show connected
  socket.on("new user", (username) => {
    connections[socket.id] = username;
    //on disconnect to socket, show disconnnected
  });
  io.emit("average", average.toFixed(2));
  // on join and post, sync all the posts
  io.emit("serverPost", postStorage);
  socket.on("addPost", (post) => {
    postStorage.push(post);
    io.emit("serverPost", postStorage);
  });
  socket.on("updateStorage", (ogPost, number, comment) => {
    postStorage[number] = ogPost;
    io.emit("serverPost", postStorage, comment);
  });
  //on receiving post, show message
  socket.on("new post", (username, title, msg) => {
    io.emit("new post", username, title, msg);
  });
  socket.on("new rate", (rating) => {
    sum = 0;
    glenEdenRating.push(rating);
    for (let i = 0; i < glenEdenRating.length; i++) {
      sum += glenEdenRating[i];
    }
    average = sum / glenEdenRating.length;
    io.emit("average", average.toFixed(2));
  });

  // weather
  weatherJs.find(
    { search: "Mississauga, ON", degreeType: "C" },
    function (err, result) {
      if (err) console.log(err);

      io.emit("weat", JSON.stringify(result, null, 2));
    }
  );
});

server.listen(3000, () => {
  console.log("url is http://localhost:3000");
});
