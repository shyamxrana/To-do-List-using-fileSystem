const express = require("express");
const app = express();
const Path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    console.log(files);
    res.render("index", { files: files });
  });
});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    res.render("show", { fileName: req.params.filename, data: data });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { fileName: req.params.filename });
});

 app.post("/edit", (req, res) => {
    console.log(req.body);

    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}` , (err) => {
        res.redirect('/')
    });
  });

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  );
});

app.post("/delete/:filename", (req, res) => {
  fs.unlink(`./files/${req.params.filename}`, (err) => {
    res.redirect("/");   
  });
});



app.listen(3000, () => {
  console.log(
    "server is running on localhost 3000 go and visit the site on your browser"
  );
});
