/**
 * Created by mr_freelancer on 23-Mar-15.
 */
var  v2d = {    //модуль для роботи з векторами
    wind: function () {
        return {x: Math.floor(5-8*Math.random()), y: Math.floor(5-8*Math.random())};                 //вітер дує як хоче
    },
    envi: function () {
        return 3;//{x: 3, y: 3};                                                                        //опір середовища незмінний
    },
    distance: function(from, to) {
        return Math.sqrt((from.x - to.x) * (from.x - to.x) + (from.y - to.y) * (from.y - to.y));    //відстань між об"єктами
    },
    scalar: function(obj,scalar) {
        obj.x *=scalar;
        obj.y *=scalar;
        return obj;
    },
    contains: function (from,to,points){
        // будуэмо пряму ax+by+c=0
        var line = v2d.buildline(from,to);
        var a = line.a;
        var b = line.b;
        var c = line.c;
        //console.log(a+','+b+','+c);
        var point = [];
        if( !(points instanceof Array)) point = [points];  else point = points;
        for(var i= point.length-1;i>=0;i--) {

            //перевіряємо координаті на прилежність відрізку
            if (((point[i].x < Math.min(from.x, to.x)) || (point[i].x > Math.max(from.x, to.x)))) continue;
            if (((point[i].y < Math.min(from.y, to.y)) || (point[i].y > Math.max(from.y, to.y)))) continue;
            // і на прилежність прямій
            if (((a*point[i].x+b*point[i].y +c) == 0)) return true; //else console.log(a*point[i].x+b*point[i].y +c);
        };

        return false;
    },
    buildline: function(from,to){
        var a = from.y - to.y;
        var b = -(from.x - to.x);
        var c = from.x*to.y - from.y*to.x;
        return {'a':a,'b':b,'c':c};
    }
};
module.exports = v2d;