module.exports = function(app)
{
     app.get('/temp',function(req,res){
        res.render('temp.html')
     });
     app.get('/humi',function(req,res){
        res.render('humi.html');
    });
}