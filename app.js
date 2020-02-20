const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set('view engine', 'ejs'); //use ejs as view engine

app.get("/", function(req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});


app.post("/", function(req, res) {
  if (req.body.list === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);

    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

// *****
// This is unnecessary because the form from which post is called is directed at "/"
// Therefore a logic has been performed in app.post("/", ..) to determine/differentiate,
// If the new item is for / (homepage) or /work (work) page
// ________________
// app.post("/work", function(req, res) {
//   let items = req.body.newItem;
//   workItems.push(items);
//
//   res.redirect("/work");
// });

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
})
