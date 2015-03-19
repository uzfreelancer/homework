/**
 * Created by mr_freelancer on 19-Mar-15.
 */

var express = require('express');
var  app = express();

app.get('\\', function (req,res,next){
    res.send('request received');
});

app.listen(3020,function(req,res,next){
   console.log('Server starting on port 3020 successfully');
});