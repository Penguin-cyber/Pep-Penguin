//User side
const socket = io();

//post const
const chat = document.getElementById("chat");
const form = document.getElementById("form");
const message = document.getElementById("message");
const texts = document.getElementById("texts");
const posts = document.getElementById("posts");
const title = document.getElementById("title");

//initialize const
const home = document.getElementById("init");
const login = document.getElementById("login");
const usernameElement = document.getElementById("username");
const mapInterface = document.getElementById("map");

//return
var curr = sel;
var last = sel;

function back() {
  if (curr != last) {
    curr.style.display = "none";
    last.style.display = "block";
    mapInterface.style.display = "block";
  }
}

usernameElement.value =
  localStorage.getItem("username") ?? usernameElement.value;

if (localStorage.getItem("username")) {
  home.style.display = "none";
  sel.style.display = "block";
  mapInterface.style.display = "block";
  curr = sel;
  last = home;

  const para = document.createElement("span");
  para.textContent = "Welcome " + usernameElement.value + "!";
  para.className = "sub";
  document.getElementById("welcome").innerHTML = para.textContent;
  socket.emit("new user", usernameElement.value);
}

//home screen
login.addEventListener("submit", (e) => {
  e.preventDefault();
  //if username is submitted, save username
  if (usernameElement.value) {
    home.style.display = "none";
    sel.style.display = "block";
    curr = sel;
    last = home;
    localStorage.setItem("username", usernameElement.value);

    const para = document.createElement("span");
    para.textContent = "Welcome " + usernameElement.value + "!";
    para.className = "sub";
    document.getElementById("welcome").innerHTML = para.textContent;
    socket.emit("new user", usernameElement.value);
  }
});

// Weather
socket.on("weat", (fore) => {
  const fc = fore.split(":");
  // location
  const location = document.createElement("p");
  location.textContent = "The location is: Mississauga, Ontario";
  location.style.textAlign = "center";
  document.getElementById("forecast").innerHTML = null;
  document.getElementById("forecast").appendChild(location);

  // TODAYS STUFF
  const tdfc = document.getElementById("today");
  const weatherToday = document.createElement("ul");

  //current date for header
  const curdate = fc[14].split(",");
  const cdow = fc[22].split(",");
  const observationTime =
    ", " +
    fc[15].replaceAll('"', "") +
    ":" +
    fc[16].replaceAll('"', "") +
    ":" +
    fc[17].split(",")[0].replaceAll('"', "");
  const currentDay =
    cdow[0].replaceAll('"', "") + "," + curdate[0].replaceAll('"', "");
  document.getElementById("tdh").innerHTML =
    "Upcoming Conditions: " + currentDay + observationTime;

  // current temperature
  const curtemp = fc[11].split(",");
  const currentTemperature = document.createElement("li");
  currentTemperature.textContent =
    "The current temperature is: " + curtemp[0].replaceAll('"', "") + "°C";
  weatherToday.appendChild(currentTemperature);

  // current weather conditions
  const cursky = fc[13].split(",");
  const currentSky = document.createElement("li");
  currentSky.textContent =
    "Current weather conditions: " + cursky[0].replaceAll('"', "");
  weatherToday.appendChild(currentSky);

  // current wind display
  const curwin = fc[21].split(",");
  const currentWind = document.createElement("li");
  currentWind.textContent = "Winds: " + curwin[0].replaceAll('"', "");
  weatherToday.appendChild(currentWind);

  tdfc.innerHTML = null;
  tdfc.appendChild(weatherToday);

  //TOMORROW
  const tmrwfc = document.getElementById("day1");
  const weatherTomorrow = document.createElement("ul");

  //next day date
  const d1 = fc[40].split(",");
  const dow1 = fc[41].split(",");
  const tomorrowDate =
    dow1[0].replaceAll('"', "") + "," + d1[0].replaceAll('"', "");
  document.getElementById("day1h").innerHTML = tomorrowDate;

  // high and low
  const high1 = fc[36].split(",");
  const low1 = fc[37].split(",");
  const highLow1 = document.createElement("li");
  highLow1.textContent =
    "Low:" +
    high1[0].replaceAll('"', "") +
    "°C," +
    " High:" +
    low1[0].replaceAll('"', "") +
    "°C";
  weatherTomorrow.appendChild(highLow1);

  // weather conditions
  const sky1 = fc[39].split(",");
  const skycon1 = document.createElement("li");
  skycon1.textContent = "Weather conditions: " + sky1[0].replaceAll('"', "");
  weatherTomorrow.appendChild(skycon1);

  //precipitation
  const pre1 = fc[43].split(",");
  const precip1 = document.createElement("li");
  const preci1 = pre1[0].replaceAll('"', "");
  precip1.textContent =
    "Chance of precipitation: " + preci1.replaceAll("}", "") + "%";
  weatherTomorrow.appendChild(precip1);

  tmrwfc.innerHTML = null;
  tmrwfc.appendChild(weatherTomorrow);

  // DAY 2
  const day2fc = document.getElementById("day2");
  const weatherDay2 = document.createElement("ul");

  // date
  const d2 = fc[48].split(",");
  const dow2 = fc[49].split(",");
  const day2Date =
    dow2[0].replaceAll('"', "") + "," + d2[0].replaceAll('"', "");
  document.getElementById("day2h").innerHTML = day2Date;

  // high and low
  const high2 = fc[44].split(",");
  const low2 = fc[45].split(",");
  const highLow2 = document.createElement("li");
  highLow2.textContent =
    "Low:" +
    high2[0].replaceAll('"', "") +
    "°C," +
    " High:" +
    low2[0].replaceAll('"', "") +
    "°C";
  weatherDay2.appendChild(highLow2);

  // weather
  const sky2 = fc[47].split(",");
  const skycon2 = document.createElement("li");
  skycon2.textContent = "Weather conditions: " + sky2[0].replaceAll('"', "");
  weatherDay2.appendChild(skycon2);

  //precipitation
  const pre2 = fc[51].split(",");
  const preci2 = pre2[0].replaceAll('"', "");
  const precip2 = document.createElement("li");
  precip2.textContent =
    "Chance of precipitation: " + preci2.replaceAll("}", "") + "%";
  weatherDay2.appendChild(precip2);

  day2fc.innerHTML = null;
  day2fc.appendChild(weatherDay2);

  // DAY 3
  const day3fc = document.getElementById("day3");
  const weatherDay3 = document.createElement("ul");

  // date
  const d3 = fc[56].split(",");
  const dow3 = fc[57].split(",");
  const day3Date =
    dow3[0].replaceAll('"', "") + "," + d3[0].replaceAll('"', "");
  document.getElementById("day3h").innerHTML = day3Date;

  // high and low
  const high3 = fc[52].split(",");
  const low3 = fc[53].split(",");
  const highLow3 = document.createElement("li");
  highLow3.textContent =
    "Low:" +
    high3[0].replaceAll('"', "") +
    "°C," +
    " High:" +
    low3[0].replaceAll('"', "") +
    "°C";
  weatherDay3.appendChild(highLow3);

  // weather conditions
  const sky3 = fc[55].split(",");
  const skycon3 = document.createElement("li");
  skycon3.textContent = "Weather conditions: " + sky3[0].replaceAll('"', "");
  weatherDay3.appendChild(skycon3);

  //precipitation
  const pre3 = fc[59].split(",");
  const preci3 = pre3[0].replaceAll('"', "");
  const precip3 = document.createElement("li");
  precip3.textContent =
    "Chance of precipitation: " + preci3.replaceAll("}", "") + "%";
  weatherDay3.appendChild(precip3);

  day3fc.innerHTML = null;
  day3fc.appendChild(weatherDay3);

  // DAY 4
  const day4fc = document.getElementById("day4");
  const weatherDay4 = document.createElement("ul");

  // date
  const d4 = fc[64].split(",");
  const dow4 = fc[65].split(",");
  const day4Date =
    dow4[0].replaceAll('"', "") + "," + d4[0].replaceAll('"', "");
  document.getElementById("day4h").innerHTML = day4Date;

  // high and low
  const high4 = fc[60].split(",");
  const low4 = fc[61].split(",");
  const highLow4 = document.createElement("li");
  highLow4.textContent =
    "Low:" +
    high4[0].replaceAll('"', "") +
    "°C," +
    " High:" +
    low4[0].replaceAll('"', "") +
    "°C";
  weatherDay4.appendChild(highLow4);

  // weather conditions
  const sky4 = fc[63].split(",");
  const skycon4 = document.createElement("li");
  skycon4.textContent = "Weather conditions: " + sky4[0].replaceAll('"', "");
  weatherDay4.appendChild(skycon4);

  //precipitation
  const pre4 = fc[67].split(",");
  const prec4 = pre4[0].replaceAll('"', "");
  const preci4 = prec4[1].replaceAll("]", "");
  const precip4 = document.createElement("li");
  precip4.textContent =
    "Chance of precipitation: " + preci4.replaceAll("}", "") + " %";
  weatherDay4.appendChild(precip4);

  day4fc.innerHTML = null;
  day4fc.appendChild(weatherDay4);
});

function news() {
  curr = nw;
  last = sel;
  nw.style.display = "block";
  sel.style.display = "none";
}

function forums() {
  curr = chat;
  last = sel;
  sel.style.display = "none";
  chat.style.display = "block";
}

//POSTS:

//post event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //if post is sent, send signal to server with the post, then clear the post box
  if (title.value) {
    socket.emit("new post", usernameElement.value, title.value, message.value);

    //read msg and then add to unordered list
    const newPost = document.createElement("div");
    newPost.className = "post";

    // the button and display
    document.getElementById("sendpost").style.display = "none";
    document.getElementById("posts").style.display = "block";
    document.getElementById("createPost").innerHTML = "Create Post";

    // POST HEADER

    // title
    const heading = document.createElement("b");
    heading.textContent = title.value;
    newPost.appendChild(heading);
    const br = document.createElement("br");
    newPost.appendChild(br);
    // Poster
    const name = document.createElement("p");
    name.textContent = "Posted by: " + usernameElement.value;
    name.className = "postSub";
    newPost.appendChild(name);
    // Current time
    const date = new Date();
    const convertedDate = date.toLocaleString("en-CN", { timeZone: "EST" });
    const currentTime = document.createElement("p");
    currentTime.textContent = "Posted at: " + convertedDate;
    currentTime.className = "postSub";
    newPost.appendChild(currentTime);

    // post content
    const postContent = document.createElement("p");
    postContent.textContent = message.value;
    newPost.appendChild(postContent);

    // add the div to the section
    socket.emit("addPost", newPost.innerHTML);

    message.value = "";
    title.value = "";
  }
});

// syncing all the client side posts
socket.on("serverPost", (postStorage) => {
  posts.innerHTML = null;
  for (let i = postStorage.length - 1; i >= 0; i--) {
    const number = i;
    const post = document.createElement("div");
    post.className = "post";
    post.id = "post" + number;
    let postId = post.id;
    // add listen for comment, on click, create the area to fill out comment
    const commentButton = document.createElement("button");
    commentButton.className = "commentButton";
    commentButton.textContent = "Write a Comment!";
    commentButton.id = "commentButton" + i;
    commentButton.addEventListener("click", () => {
      comment(postId, number, postStorage, commentButton.id);
    });
    commentButton.className = "commentButton";
    post.innerHTML = postStorage[i];
    post.appendChild(commentButton);
    posts.appendChild(post);
  }
});

function createPost() {
  if (document.getElementById("posts").style.display == "block") {
    document.getElementById("requireTi").style.display = "block";
    document.getElementById("sendpost").style.display = "block";
    document.getElementById("posts").style.display = "none";
    document.getElementById("createPost").innerHTML = "Cancel";
  } else {
    document.getElementById("requireTi").style.display = "none";
    document.getElementById("sendpost").style.display = "none";
    document.getElementById("posts").style.display = "block";
    document.getElementById("createPost").innerHTML = "Create Post";
  }
}

// comments
function comment(postId, number, postStorage, commentButtonId) {
  const commentArea = document.createElement("div");
  commentArea.id = "commentArea" + number;
  commentArea.className = "commentArea";
  commentArea.textContent = "Comment:";

  const commentBox = document.createElement("input");
  commentBox.id = "commentBox" + number;
  commentBox.className = "commentBox";

  const sendComment = document.createElement("button");
  sendComment.innerHTML = "Post";
  sendComment.className = "commentButton";
  sendComment.addEventListener("click", () => {
    postComment(
      postId,
      number,
      commentArea.id,
      usernameElement.value,
      commentButtonId
    );
  });

  commentArea.appendChild(document.createElement("br"));
  commentArea.appendChild(commentBox);
  commentArea.appendChild(sendComment);

  for (let i = postStorage.length - 1; i >= 0; i--) {
    document.getElementById("post" + i).remove();
    // recreates the orginal post
    const post = document.createElement("div");
    post.className = "post";
    post.id = "post" + i;

    post.innerHTML = postStorage[i];

    const commentButton = document.createElement("button");
    commentButton.className = "commentButton";
    commentButton.textContent = "Write a Comment!";
    commentButton.id = "commentButton" + i;
    commentButton.addEventListener("click", () => {
      comment(post.id, i, postStorage, commentButton.id);
    });
    commentButton.className = "commentButton";
    post.appendChild(commentButton);

    // checks if correct post
    if (post.id == postId) {
      post.appendChild(commentArea);
    }

    posts.appendChild(post);
  }
}

// on submitting the comment do this
function postComment(
  postId,
  number,
  commentAreaId,
  commentCreator,
  commentButtonId
) {
  const commentBox = document.getElementById("commentBox" + number);
  const commentBoxValue = commentBox.value;
  const ogPost = document.getElementById(postId);
  // if there is a comment then create the comment
  if (commentBox.value) {
    document.getElementById(commentAreaId).remove();
    document.getElementById(commentButtonId).remove();
    const comment = document.createElement("div");
    comment.className = "comment";

    // comment poster
    const username = document.createElement("p");
    username.textContent = "Commented by: " + commentCreator;
    username.className = "postSub";

    // comment time
    const date = new Date();
    const convertedDate = date.toLocaleString("en-CN", { timeZone: "EST" });
    const currentTime = document.createElement("p");
    currentTime.textContent = "Commented at: " + convertedDate;
    currentTime.className = "postSub";

    const commentContents = document.createElement("p");
    commentContents.className = "commentBody";
    commentContents.textContent = commentBoxValue;

    comment.appendChild(username);
    comment.appendChild(currentTime);
    comment.appendChild(commentContents);

    ogPost.appendChild(comment);
    socket.emit("updateStorage", ogPost.innerHTML, number);
  }
}

// Penguin fact
function Penguin() {
  curr = pengu;
  last = sel;

  curr.style.display = "block";
  last.style.display = "none";
}

// Map
const map = L.map("map").setView([44, -79.6441], 9);

// map itself
const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  setMaxBounds: (1600, 900),
  maxZoom: 19,
  minZoom: 2,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// glen eden
const glenEdenPop = document.createElement("form");
glenEdenPop.id = "glenEdenPop";

const legend = document.createElement("legend");
legend.innerHTML = "Rate This Location";

const rating = document.createElement("p");

const star1 = document.createElement("input");
star1.id = "star1";
star1.type = "radio";
star1.value = "1";
star1.name = "rate";
const star2 = document.createElement("input");
star2.id = "star2";
star2.type = "radio";
star2.value = "2";
star2.name = "rate";
const star3 = document.createElement("input");
star3.id = "star3";
star3.type = "radio";
star3.value = "3";
star3.name = "rate";
const star4 = document.createElement("input");
star4.id = "star4";
star4.type = "radio";
star4.value = "4";
star4.name = "rate";
const star5 = document.createElement("input");
star5.id = "star5";
star5.type = "radio";
star5.value = "5";
star5.name = "rate";

const labstar1 = document.createElement("label");
labstar1.for = "star1";
labstar1.innerHTML = "1";
const labstar2 = document.createElement("label");
labstar2.for = "star2";
labstar2.innerHTML = "2";
const labstar3 = document.createElement("label");
labstar3.for = "star3";
labstar3.innerHTML = "3";
const labstar4 = document.createElement("label");
labstar4.for = "star4";
labstar4.innerHTML = "4";
const labstar5 = document.createElement("label");
labstar5.for = "star5";
labstar5.innerHTML = "5";

const submitButton = document.createElement("input");
submitButton.type = "submit";
submitButton.innerHTML = "Rate";
glenEdenPop.addEventListener("submit", (e) => {
  e.preventDefault();

  const rate = document.getElementsByName("rate");
  for (let i = 0; i < 5; i++) {
    if (rate[i].checked) {
      const value = parseInt(rate[i].value);
      socket.emit("new rate", value);
      glenEdenPop.reset();
      break;
    }
  }
});

const glenEdenName = document.createElement("p");
glenEdenName.innerHTML = "Glen Eden";

glenEdenPop.append(
  glenEdenName,
  rating,
  legend,
  labstar1,
  star1,
  labstar2,
  star2,
  labstar3,
  star3,
  labstar4,
  star4,
  labstar5,
  star5,
  document.createElement("br"),
  submitButton
);
var glenEden = L.marker([43.504, -79.9389])
  .addTo(map)
  .bindPopup(glenEdenPop)
  .openPopup();

socket.on("average", (average) => {
  glenEdenPop.innerHTML = null;
  const rating = document.createElement("p");
  rating.innerHTML = "The average rating is: " + average + "/5";
  glenEdenPop.append(
    glenEdenName,
    rating,
    legend,
    labstar1,
    star1,
    labstar2,
    star2,
    labstar3,
    star3,
    labstar4,
    star4,
    labstar5,
    star5,
    document.createElement("br"),
    submitButton
  );
  glenEdenPop.addEventListener("submit", (e) => {
    e.preventDefault();

    const rate = document.getElementsByName("rate");
    for (let i = 0; i < 5; i++) {
      if (rate[i].checked) {
        console.log(rate[i].value);
        socket.emit("new rate", rate[i].value);
        glenEdenPop.reset();
        break;
      }
    }
  });
  L.marker([43.504, -79.9389]).bindPopup(glenEdenPop);
});

// Chicopee
var Chicopee = L.marker([43.436, -80.4183])
  .addTo(map)
  .bindPopup("Chicopee")
  .openPopup();

// north york
var northYork = L.marker([43.7526, -79.4318])
  .addTo(map)
  .bindPopup("North York")
  .openPopup();

// blue mountain
var blueMountain = L.marker([44.5011, -80.3161])
  .addTo(map)
  .bindPopup("Blue Mountain")
  .openPopup();

// lakeridge ski resort
var lakeRidge = L.marker([44.03, -78.94])
  .addTo(map)
  .bindPopup("Lake Ridge")
  .openPopup();

// mount st. louis moonstone
var mountStLouisMoonstone = L.marker([44.628, -79.669])
  .addTo(map)
  .bindPopup("Mount St. Louis Moonstone")
  .openPopup();

function toggleMode() {
  var body = document.body;
  body.classList.toggle("bodyLight");
}

var Mississauga = L.marker([43.589, -79.6441])
  .addTo(map)
  .bindPopup("This is Mississauga, ON, Canada")
  .openPopup();
