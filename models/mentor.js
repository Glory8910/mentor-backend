let mongoose=require('mongoose')



let mentorlist=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   studentsarr:{
        type:Array,
        required:false,
        unique:true
    }
   
})

var mentors=mongoose.model("men",mentorlist)

module.exports={mentors}