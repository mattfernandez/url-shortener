const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Url = require('./models/Url')


const app = express();

mongoose.connect('', { useNewUrlParser:true, useUnifiedTopology: true})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async (req,res) =>{
  const urls = await Url.find() 
  res.send({urls: urls})
})

app.post('/', async (req,res) =>{
  const obj = JSON.parse(JSON.stringify(req.body));
  await Url.create(obj)
})

app.get('/:shortUrl', async (req,res) =>{
  const shortUrl = await Url.findOne({short: req.params.shortUrl})
  console.log(shortUrl)
  if(shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect('https://youtube.com')
})


app.listen(process.env.PORT || 5000);