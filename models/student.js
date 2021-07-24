let mongoose=require('mongoose')



let studentlist=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mentorname:{
        type:String,
        required:false

    }
  
})

var students=mongoose.model("stu",studentlist)

module.exports={students}