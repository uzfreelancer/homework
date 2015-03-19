/**
 * Created by mr_freelancer on 19-Mar-15.
 */
module.exports = function(app){


    app.get('/', function (req,res,next){
        res.send('request received' + req.ip);
    });
};