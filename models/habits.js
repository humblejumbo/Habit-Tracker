var mongoose= require('mongoose');

var habitSchema = new mongoose.Schema(
    {
        title: String,
        dateCreated:
        {
            type: Date,
            default: Date.now()
        },
        description:String,
        actionToday:{
            date:Date,
            done:{
                type: Boolean,
                default: false
            },
            fail:
            {
                type: Boolean,
                default: false 
            },
            skip:
            {
                type:Boolean,
                default:true
            }
        },
        actionWeekly:[{
            date: Date,
            done: {
                type: Boolean,
                default: false
            },
            fail:
            {
                type: Boolean,
                default: false
            },
            skip:
            {
                type: Boolean,
                default: true
            }
        }]     
    });


module.exports=mongoose.model("habit",habitSchema);