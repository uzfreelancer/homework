/**
 * Created by mr_freelancer on 19-Mar-15.
 */

var express = require('express');
var app = express();

require('./routes/index.js')(app);

app.listen(3020,function(){
   console.log('Server starting on port 3020 successfully');
});

var Item = require('./modules/item.js');
var komar  = new Item(000,000,100,30, 160, 150, false, true, null,0.5, 0.2);
var spider = new Item(400,300,200,15, 140, 100, true, false, null,  1, 0.8);

var v2d = require('./modules/v2d.js');

//Массиви шляхів героїв і масив перешкод
var ways = require('./modules/ways.js');
var waykomar = ways.way1;
var wayspider= ways.way2;
var barrier= ways.wall;
waykomar.ind = -1;
wayspider.ind = -1;

console.log('Битва комара и паука ------------------------------------------------------------------------------------');
var steps =0;
while (spider.health >0 && komar.health >0)
{
    steps++;

    var hod = spider.range;
    while ( hod > 0 ){
        wayspider.ind++;
        if(wayspider.ind >= wayspider.length){ wayspider.ind = 0};
        if (v2d.contains(spider.getPos(),{x:wayspider[wayspider.ind].x, y:wayspider[wayspider.ind].y},barrier))
                console.log('Spider has barrier on way from {'+spider.x+','+spider.y+'} to {'  +wayspider[wayspider.ind].x +',' + wayspider[wayspider.ind].y + '} ');
        hod = spider.moveTo(wayspider[wayspider.ind].x, wayspider[wayspider.ind].y, hod);
    }
    var hod = komar.range;
    while ( hod > 0 ){
        waykomar.ind++;
        if(waykomar.ind >= waykomar.length){ waykomar.ind = 0};
        if (v2d.contains(komar.getPos(),{x:waykomar[waykomar.ind].x, y:waykomar[waykomar.ind].y},barrier))
            console.log('Komar has barrier on way from {'+komar.x+','+komar.y+'} to {'  +waykomar[waykomar.ind].x +',' + waykomar[waykomar.ind].y + '} ')
        hod = komar.moveTo(waykomar[waykomar.ind].x, waykomar[waykomar.ind].y, hod);
    }

    var uronk = komar.fight(spider);
    spider.healthTo(uronk);
    var urons = spider.fight(komar);
    komar.healthTo(urons);

    //steps++;
    console.log(steps + ' komar (x,y,health): x:' +komar.x+',y:' +komar.y+',health:'+komar.health + ',uron:' + uronk);
    console.log(steps + ' spider (x,y,health): x:' +spider.x+ ',y:' +spider.y+',health:'+spider.health + ',uron:'+urons);

};
var winner =  spider.health > 0 ? "spider" : "komar";
winner = spider.health ==0 && komar.health ==0  ? "They are both dead. Muha ": winner;
console.log( winner + " wins at " + steps + " step!")
