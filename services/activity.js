var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://dbuser:hisummer123@ds059654.mongolab.com:59654/mavenli-db';

mongoose.connect(mongodbUri, options);


var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once('open', function callback ()
{
    console.log("connected to Mongodb");
    console.log("Mongodb started " + new Date());
});

//Define the schema for our activites
var ActivitiesSchema =
{
    name: String
};

//Initialize our appontment database using the above schema
var ActivitiesDB = mongoose.model('ActvitiesDB', mongoose.Schema(ActivitiesSchema));

exports.getAllActivities = function(req, res)
{
/*  console.log("db create");
  var act = new ActivitiesDB({ name: 'summer'});
  act.save(); */

  console.log("getAllActivies");
  ActivitiesDB.find({}, function(err, obj)
  {
      res.json(obj);
  });
};
