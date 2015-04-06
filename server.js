/**
 * Created by mr_freelancer on 19-Mar-15.
 */

var express = require('express');
var app = express();


var v2d = require('./modules/v2d.js');

//Массиви шляхів героїв і масив перешкод
var ways = require('./modules/ways.js');
var wayhero = ways.way1;
var wayenemy= ways.way2;
var barrier= ways.wall;


// підтягаємо модуль з класом персонажа
var items = require('./modules/item.js');
/*
var heroproto  = new items.Item(000,000,100,15, 160, 130, "komar", "heroes", null);
var superhero  = new items.SuperItem(10,7,5,heroproto);
var hero  = new items.MegaItem(2,superhero);
var enemyproto = new items.Item(400,300,250,17, 140, 100, "spider", "enemies", null);
var enemy = new items.SuperItem(5,2,0,enemyproto);
*/

var Stage = require('./modules/stage.js');
var stage = new Stage(800,600);

var arrHeroItems = [];
for(var k=0;k<3;k++)
{
    var heroproto  = new items.Item(Math.random()*stage.width,Math.random()*stage.height,50+100*Math.random(),5+20*Math.random(), 100+150*Math.random(), 100+100*Math.random(), "komar"+ k, "heroes", null);
    var superhero  = new items.SuperItem(5+10*Math.random(),10*Math.random(),10*Math.random(),heroproto);
    var hero  = new items.MegaItem(0.5+Math.random()*2,superhero);
    hero.way = wayhero;
    hero.step = Math.ceil(hero.way.length*Math.random());
    
    arrHeroItems.push(hero);
}
var arrEnemyItems = [];
for(var j=0;j<4;j++)
{
    var enemyproto  = new items.Item(stage.width/2,stage.height/2,100+200*Math.random(),5+20*Math.random(), 100+50*Math.random(), 50+150*Math.random(), "spider"+ j, "enemies", null);
    var superenemy  = new items.SuperItem(5+10*Math.random(),10*Math.random(),10*Math.random(),enemyproto);
    var enemy  = superenemy;//new items.MegaItem(0.5+Math.random()*2,superenemy);
    enemy.way = wayenemy;
    enemy.step = Math.ceil(enemy.way.length*Math.random());
    
    arrEnemyItems.push(enemy);
}



console.log('Битва на сервере супергероев  и врагов ------------------------------------------------------------------------------------');
var steps =0;
showInfo(steps);

while(arrHeroItems.length>0 && arrEnemyItems.length >0 && steps<1000)
{


    var  i =0;
    //перемещение
    for(i=arrEnemyItems.length-1;i>=0;i--)
    {
        var enemy = arrEnemyItems[i];
        var way = enemy.way;
        var hod = enemy.range;
        while ( hod > 0 ){
            enemy.step++;
            if(enemy.step >= enemy.way.length-1){ enemy.step = 0};
            //if (v2d.contains(enemy.getPos(),{x:enemy.way[enemy.step].x, y:enemy.way[enemy.step].y},barrier))
            if (v2d.contains(enemy.getPos(),{x:way[enemy.step].x, y:way[enemy.step].y},barrier))
               // console.log('Enemy ' + enemy.name +' has barrier on way from {'+enemy.x+','+enemy.y+'} to {' +enemy.way[enemy.step].x +',' + enemy.way[enemy.step].y + '} ');
                console.log('Enemy ' + enemy.name +' has barrier on way from {'+enemy.x+','+enemy.y+'} to {' +way[enemy.step].x +',' + way[enemy.step].y + '} ');
            hod = enemy.moveTo(enemy.way[enemy.step].x, enemy.way[enemy.step].y, hod);
        };
        for(var j=arrHeroItems.length-1;j>=0;j--)
        {
            var uronk = arrHeroItems[j].fight(enemy);
            enemy.healthTo(uronk);
            if (enemy.health >0)
            {
                var urons = enemy.fight(arrHeroItems[j]);
                arrHeroItems[j].healthTo(urons);
            }
            else{
                arrEnemyItems.splice(i,1);
            }

        };
    };
    
    for(i=arrHeroItems.length-1;i>=0;i--)
    {
        var hero = arrHeroItems[i];
        var hod = hero.range;
        while ( hod > 0 ){
            hero.step++;
            if(hero.step >= hero.way.length){ hero.step = 0};
            if (v2d.contains(hero.getPos(),{x:hero.way[hero.step].x, y:hero.way[hero.step].y},barrier))
                console.log('hero ' + hero.name +' has barrier on way from {'+hero.x+','+hero.y+'} to {' +hero.way[hero.step].x +',' + hero.way[hero.step].y + '} ');
            hod = hero.moveTo(hero.way[hero.step].x, hero.way[hero.step].y, hod);
        };

        for(var j=arrEnemyItems.length-1;j>=0;j--)
        {
            var uronk = arrEnemyItems[j].fight(hero);
            hero.healthTo(uronk);
            if(hero.health > 0 ) {
                var urons = hero.fight(arrEnemyItems[j]);
                arrEnemyItems[j].healthTo(urons);
            }
            else {
                arrHeroItems.splice(i,1);
            };
        };
    };

    steps++;
    showInfo(steps);

};

function showInfo(step)
{
    console.log('------------------------------Step '+ step + '-------------------------------------------------------');

    var i =0;
    console.log('Heroes - '+ arrHeroItems.length);
    for(i= arrHeroItems.length-1; i>=0;i--)
    {
        var hero = arrHeroItems[i];
        console.log(hero.name + ' (x,y,health): x:' +hero.x+',y:' +hero.y+',health:'+hero.health + '\t\t,(range,speed,weapon,shield):' + hero.range+ ',' + hero.speed+ ',' + hero.weapon+ ',' + hero.shield);
    };
    console.log('Enemies - '+ arrEnemyItems.length);
    for(i= arrEnemyItems.length-1; i>=0;i--)
    {
        var hero = arrEnemyItems[i];
        console.log(hero.name + ' (x,y,health): x:' +hero.x+',y:' +hero.y+',health:'+hero.health + '\t\t,(range,speed,weapon,shield):' + hero.range+ ',' + hero.speed+ ',' + hero.weapon+ ',' + hero.shield);
    }


};

/*
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
*/
app.listen(3020,function(){
   console.log('Server starting on port 3020 successfully');
});

