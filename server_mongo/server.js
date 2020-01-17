var mongoose = require('mongoose');//mongoose 모듈 사용
//몽고DB connection String
mongoose.connect('mongodb+srv://lioh:damons2020@cluster0-hydoh.mongodb.net/smart_factory');

var database = mongoose.connection;
database.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
database.once('open', function() {
    console.log('Connected!');
});

var sensor = mongoose.Schema({
    temp : 'number',
    humi : 'number',
    time : 'string',
});

var sensor = mongoose.model('Schema', sensor);

// 8. Student 객체를 new 로 생성해서 값을 입력
module.exports.sensors = function(Temp,Humi,Time){
    var newSensor = new sensor({temp : Temp, humi : Humi, time : Time});
    newSensor.save(function(error, data){
        if(error){
            console.log(error);
        }else{
            console.log('Saved!')
        }
    });
}