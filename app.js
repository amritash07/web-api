const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var app=express()
mongoose.connect("mongodb://localhost:27017/wikidb", {useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
var article=new mongoose.Schema({
  title:String,
  content:String
})
var Article=new mongoose.model("article",article)
app.use(express.static("public"));

app.route("/article")
.get(function(req,res)
{
  Article.find(function(err,article)
{if(err)
  {
    res.send(err)
  }
  else{
    res.send(article)
  }
})
})
.post(function(req,res)
{
  console.log(req.body.title)
  console.log(req.body.content)
  var ar=new Article({
    title:req.body.title,
    content:req.body.content
  })
  ar.save(function(err)
{
  if(err)
  {
    res.send(err)
  }
  else{
    res.send("Success")
  }
})
})
.delete(function(req,res)
{
  Article.deleteMany(function(err)
{
  if(err)
  {
    res.send("Error")
  }
  else{
    res.send("Deleted")
  }
})
})

app.get("/article/:id",function(req,res)
{
  Article.findById({_id:req.params.id},function(err,ar)
{
  if(err)
  {
    res.send("Error")
  }
  else{
    res.send(ar)
  }
})
})
app.put("/article/:id",function(req,res)
{
  Article.findByIdAndUpdate({_id:req.params.id},{title:req.body.title,content:req.body.content},function(err)
{
  if(err)
  {
    res.send(err)
  }
  else{
    res.send("Success")
  }
})
})

app.patch("/article/:id",function(req,res)
{
  Article.findByIdAndUpdate({_id:req.params.id},{$set:req.body},function(err)
{
  if(err)
  {
    res.send(err)
  }
  else{
    res.send("Success")
  }
})
})

app.delete("/article/:id",function(req,res)
{
  Article.findByIdAndDelete({_id:req.params.id},function(err)
{
  if(err)
  {
    res.send(err)
  }
  else{
    res.send("Success")
  }
})
})
app.listen(3000,function(req,res)
{
  console.log("Connected")
})
