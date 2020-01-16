var mongoose = require('mongoose');//mongoose 모듈 사용
//몽고DB connection String
mongoose.connect('mongodb+srv://lioh:damons2020@cluster0-hydoh.mongodb.net/smart_factory');

var database = mongoose.connection;
database.on('error', function(){
    console.log('Connection Failed!');
});

database.once('open', function() {
    console.log('Connected!');
});

var sensors = mongoose.Schema({
    temp : 'number',
    humi : 'number',
    time : 'string',
},{
    versionKey : false
});

var Sensor = mongoose.model('Sensor', sensors);


module.exports.sensors = function(Temp,Humi,Time){
    var newSensor = new Sensor({temp:Temp, humi:Humi,time:Time});
    newSensor.save(function(error, data){
        if(error){
            console.log(error);
        }else{
            console.log('Saved!')
        }
    });
}
module.exports.fsensors = function(findid){
    Sensor.findOne({_id:'585b777f7e2315063457e4ac'}, function(error,sensors){
        console.log('--- Read one ---');
        if(error){
            console.log(error);
        }else{
            console.log(sensor);
        }
    });
}