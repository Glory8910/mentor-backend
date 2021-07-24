var express = require('express');
var router = express.Router();

var mongoose=require("mongoose")
require('dotenv').config()


var { students } = require("../models/student");
var {mentors}=require("../models/mentor")

let url=process.env.URI


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// add student
router.post('/student',async function(req, res) {


  
  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    let value = new students({
      
      name: req.body.name,
    
      

    })

    await value.save()

    await mongoose.disconnect()
    
    res.json({ "mess": "student added" })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })

  }



});


// add mentor
router.post('/mentor', async function(req, res) {


  
  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    let mentorval = new mentors({
      
      name: req.body.name,
     

    })

    await mentorval.save()

    await mongoose.disconnect()
    
    res.json({ "mess": "mentor added" })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })
   

  }



});


// add student to mentor
router.post('/addstudents/:mentorname', async function(req, res) {

  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    console.log(req.body.stud,req.params.mentorname);

    let person=await mentors.findOneAndUpdate({name:req.params.mentorname},

      {$set:{ studentsarr:req.body.stud}},

      { new: true}
    );

  

    console.log(person,"updated")

    await mongoose.disconnect()
    res.json({ "mess": "students assigned" })
    
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })
   

  }



});

// add or update mentor to student
router.post('/addmentor/:studentname', async function(req, res) {

  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    console.log(req.body.ment,req.params.studentname);

    let person=await students.findOneAndUpdate({name:req.params.studentname},

      {$set:{ mentorname:req.body.ment}},

      { new: true}
    );

  

    console.log(person,"updated")

    await mongoose.disconnect()
    res.json({ "mess": "mentor assigned" })
    
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })
   

  }



});


// get all the students that are assigned to a particular mentor
router.get('/allstudents/:mentorname', async function(req, res) {

  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    console.log(req.body.stud,req.params.mentorname);

    let studlist=await mentors.findOne({name:req.params.mentorname});

  

    console.log(studlist,"updated")

    await mongoose.disconnect()
    res.json({ studlist })
    
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })
   

  }



});


// get the mentor assigned to particular student
router.get('/assignedmentor/:studentname', async function(req, res) {

  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    console.log(req.body.stud,req.params.studentname);

    let assignedmentor=await students.findOne({name:req.params.studentname});

  

    console.log(assignedmentor,"updated")

    await mongoose.disconnect()
    res.json({ assignedmentor })
    
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })
   

  }



});

// get all the students who are yet to be assigned a mentor
router.get("/students",async(req,res)=>{
  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    

    let allstud=await students.find({mentorname:{ $exists: false}});

  

    console.log(allstud,"updated")

    await mongoose.disconnect()
    res.json({ allstud })
    
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })
   

  }

})

// get all the mentors available
router.get("/mentors",async(req,res)=>{
  try {
    await mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });

    

    let allmentor=await mentors.find();

  

    console.log(allmentor,"updated")

    await mongoose.disconnect()
    res.json({ allmentor })
    
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err })
   

  }

})


module.exports = router;
