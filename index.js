const express = require('express');
const app=express();
const cors = require('cors')
const mongoose = require('mongoose');
const url = ''
port = process.env.PORT || 8001;
const Address = require('./model/models')

//middleware
app.use(express.json());
app.use(cors())
mongoose.connect(
    url,

    ).then(() => {
        console.log('database connected');
        app.listen(port, () => {
            console.log(`server for user started on port ${port}`);
        })
   }
);

app.post('/', async (req, res) => {
 let name = req.body.name;
 let email = req.body.email;
 let phone = req.body.phone;
 let place = req.body.place;
 if(phone.length < 10 || phone.length >10){
    return res.status(401).send("Invalid Phone Number");
 }
 let address = await Address.find({name})
 if(address.length > 0) {
    return res.status (201).send("User already exists")
 }
let newAddress = new Address({
  name: name,
  email: email,
  phone: phone,
  place: place
 })
newAddress.save().then((address) => {
  res.send(address)
 }).catch((err) => {
  console.log(err)
 })
})
app.get('/',async (req,res) => {
    let name  = req.query.name;
    console.log(name)
    let address = await Address.find({name:name})
    res.send(address)
})
app.put('/',async (req,res) => {
 let name = req.body.name;
 let email = req.body.email;
 let phone = req.body.phone;
 let place = req.body.place;
 let address = await Address.find({name})
 if(address.length == 0) {
    return res.status (404).send("User not found")
 }
 await Address.findOneAndUpdate({name},{email,phone,place})
 address = await Address.find({name:name})
    res.send(address)
})
app.delete('/', async(req,res) => {
    let name  = req.body.name;
    await Address.findOneAndDelete({name});
    res.send('Adrress Deleted');

})