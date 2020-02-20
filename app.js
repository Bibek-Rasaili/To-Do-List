const express = require('express');
const bodyParser = require('body-parser');

const date = require(__dirname+"/date.js");

console.log(date);

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set('view engine', 'ejs'); //use ejs as view engine

app.get("/", function(req, res) {


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

//to render the about page
app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
})
