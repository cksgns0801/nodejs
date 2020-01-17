var http = require('http');
var url = require('url')
var querystring = require('querystring');

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

var server = http.createServer(function(request,response){

    if(request.method == 'GET')
    {
        console.log('GET');
        
        var parserUrl = url.parse(request.url);
        var query = url.parse(request.url,true).query;
        var resource = parserUrl.pathname;
        console.log(resource);
        if(resource=='/time')
        {
            response.writeHead(200,{'Content-Type':'text/html'});
            Sensor.findOne({_id:query.id}, function(error,sensors){
                console.log('--- Read one ---');
                if(error){
                    console.log(error);
                }else{
                    console.log(sensors.time);
                    
                    response.end('time : '+sensors.time+'find : '+query.id);
                }
            });
        }
        else if(resource=='/temp')
        {
            response.writeHead(200,{'Content-Type':'text/html'});
            Sensor.findOne({_id:'5e1fd04431e32a1c04086ea4'}, function(error,sensors){
                console.log('--- Read one ---');
                if(error){
                    console.log(error);
                }else{
                    console.log(sensors.time);
                    
                    response.end('temp :  '+sensors.temp);
                }
            });
        }
        else if(resource=='/find')
        {
            response.writeHead(200,{'Content-Type':'text/html'});
            Sensor.findOne({_id:query.id}, function(error,sensors){
                console.log('--- Read one ---');
                if(error){
                    console.log(error);
                }else{
                    console.log(sensors.time);
                    
                    response.end('id : '+ query.id + '<br>' + 
                                'temp : '+ sensors.temp+ '<br>' +
                                'humi : '+ sensors.humi+ '<br>' + 
                                'date : '+ sensors.time);
                }
            });
        }
        else
        {
            response.writeHead(404,{'Content-Type':'text/html'});
            response.end('404 Page Not Found');
        }
    }
        
    else if(request.method == 'POST')
    {
        var postdata= '';
        request.on('data', function (data) {
            postdata = postdata + data;
        });
        request.on('end', function () {
            var parsedQuery = querystring.parse(postdata);
            console.log(parsedQuery);
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end('temp = '+parsedQuery.temp+' humi = '+parsedQuery.humi+' date = '+parsedQuery.time);

            var newSensor = new Sensor({temp:parsedQuery.temp, humi:parsedQuery.humi,time:parsedQuery.time});
            newSensor.save(function(error, data){
                if(error){
                    console.log(error);
                }else{
                    console.log('Saved!')
                }
            });
        });
        
    }
});

server.listen(8080, function(){
    console.log('Server is running...');
});