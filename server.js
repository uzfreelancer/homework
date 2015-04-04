/**
 * Created by mr_freelancer on 19-Mar-15.
 */

var express = require('express');
var app = express();

// підтягаємо модуль з класом персонажа
var items = require('./modules/item.js');
var heroproto  = new items.Item(000,000,100,15, 160, 130, false, true, null,0.5, 0.2);
var superhero  = new items.SuperItem(10,7,5,heroproto);
var hero  = new items.MegaItem(2,superhero);
var enemyproto = new items.Item(400,300,250,17, 140, 100, true, false, null,  1, 0.8);
var enemy = new items.SuperItem(5,2,0,enemyproto);


var v2d = require('./modules/v2d.js');

//Массиви шляхів героїв і масив перешкод
var ways = require('./modules/ways.js');
var wayhero = ways.way1;
var wayenemy= ways.way2;
var barrier= ways.wall;
wayhero.ind = -1;
wayenemy.ind = -1;


var step = function (point)
{
    var msg = "";
    var hod = hero.range;
    if (v2d.contains(hero.getPos(),{x:point.x, y:point.y},barrier))
        msg = 'hero has barrier on way from {'+hero.x+','+hero.y+'} to {'  +wayhero[wayhero.ind].x +',' + wayhero[wayhero.ind].y + '} ';
    hod = hero.moveTo(point.x, point.y, hod);

    hod = enemy.range;
    while ( hod > 0 ){
        wayenemy.ind++;
        if(wayenemy.ind >= wayenemy.length){ wayenemy.ind = 0};
        if (v2d.contains(enemy.getPos(),{x:wayenemy[wayenemy.ind].x, y:wayenemy[wayenemy.ind].y},barrier))
            msg =msg + '/n' +' enemy has barrier on way from {'+enemy.x+','+enemy.y+'} to {'  +wayenemy[wayenemy.ind].x +',' + wayenemy[wayenemy.ind].y + '} ';
        hod = enemy.moveTo(wayenemy[wayenemy.ind].x, wayenemy[wayenemy.ind].y, hod);
    };

    var uronk = hero.fight(enemy);
    enemy.healthTo(uronk);
    var urons = enemy.fight(hero);
    hero.healthTo(urons);

    return msg;
}
app.set('step',step);
app.set('hero',hero);
app.set('enemy',enemy);

require('./routes/index.js')(app);

app.listen(3020,function(){
   console.log('Server starting on port 3020 successfully');
});

