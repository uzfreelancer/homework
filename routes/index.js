/**
 * Created by mr_freelancer on 19-Mar-15.
 */
module.exports = function(app){


    app.get('/', function (req,res,next){
        //res.send('request received' + req.ip);
        res.status(200).send('Controls for hero /hero//[action]/[x]/[y] <br /> Controls for enemy /enemy/[action]/[x]/[y] <br /> Available actions move or figth');
    });

    app.get('/hero/move/:x/:y', function(req,res,next){
        //var act = req.params.action;
        var x = req.params.x;
        var y = req.params.y;
        res.status(200).send('Hero moves to (x: '+ x +' , y: '+ y + '}.');
    });

    app.get('/hero/fight', function(req,res,next){
        res.status(200).send('Hero try to fight');
    });

    app.get('/enemy/move/:x/:y', function(req,res,next){
        //var act = req.params.action;
        var x = req.params.x;
        var y = req.params.y;
        res.status(200).send('Enemy moves to (x: '+ x +' , y: '+ y + '}.');
    });

    app.get('/enemy/fight', function(req,res,next){
        res.status(200).send('Enemy try to fight');
    });
    app.get(new RegExp('[a-zA_Z09]*'), function(req,res,next){
        res.status(200).send('Incorrect action');
    });
};