var express = require('express');
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var dotenv  =require('dotenv');
var habits= require('./models/habits');


var app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine','ejs');


mongoose.connect(process.env.DATABASEURL);
//mongoose.connect('mongodb://imsg:shubham12@ds147487.mlab.com:47487/habiter');



app.get('/',function(req,res)
{
    res.redirect('/daily');
});

app.get('/daily',function(req,res)
{
    habits.find({},function(err,all)
    {
        if(!err)
        {            
            res.render('daily.ejs',{habits:all});

        }
    });
});

app.get('/new', function(req,res)
{
    res.render('new');
})

app.post('/daily',function(req,res)
{
    var obj=
    {
        title: req.body.title,
        description:req.body.description,        
    };

    habits.create(obj, function (err, newHabit) {
        if (err)
            console.log("ERROR!");
        else {
            console.log(newHabit);

            let d1= new Date(Date.now());
            d1.setDate(d1.getDate()-6);
            let actionWeekly=[];
            for(let i=0;i<7;i++)
            {
                let action=newHabit.actionToday;
                d1.setDate(d1.getDate()+i);
                action.date=d1;
                actionWeekly.push(action);
            }
            newHabit.actionWeekly=actionWeekly;            
            res.redirect('/daily')
        }
    });
})


app.get('/weekly',function(req,res)
{
    habits.find({}, function (err, all) {
        if(err)
        {
            console.log("ERROR!");
        }
        if (!err) {
            res.render('weekly', { habits: all });
        }
    });
});

app.listen(3000,function()
{
    console.log('server is running');
})

