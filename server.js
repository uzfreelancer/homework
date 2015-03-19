/**
 * Created by mr_freelancer on 19-Mar-15.
 */

var express = require('express');
var app = express();

require('./routes/index.js')(app);

app.listen(3020,function(){
   console.log('Server starting on port 3020 successfully');
});