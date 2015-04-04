/**
 * Created by mr_freelancer on 23-Mar-15.
 */
var v2d = require('./v2d.js');
var Item = function (x,y,health,power,speed, range, jumped,flyed,clan, opwind,openvi){
    this.x = x ? x : 0 ;
    this.y = y ? y : 0 ;
    this.health = health ? health : 100 ;
    this.power = power ? power : 0 ;
    this.speed = speed ? speed : 0 ;
    this.range = range ? range : 0 ;
    this.clan = clan ? clan : {name: "noname", clanpower: 0 } ;
    this.opwind = opwind ? opwind : 0 ;
    this.openvi = openvi ? openvi : 0 ;
    this.jumped = jumped ? true : false ;
    this.flyed = flyed ? true : false ;
    this.moveTo = function(a,b, hod){
        hod = hod ? hod : this.range;
        var distance = v2d.distance(this.getPos(),{x:a, y:b});
        if(distance <= hod) {
            this.y = Math.round(b);
            this.x = Math.round(a);
            return Math.round(hod-distance);
        }
        else
        {
            var line = v2d.buildline(this.getPos(),{x:a,y:b});
            this.x = this.x + (a-this.x)*hod/distance;
            this.y = this.y + (b-this.y)*hod/distance;
            //this.x = Math.round(this.x+(hod/distance)*(a-this.x));
            //this.y = Math.round(-(line.c+line.a*this.x)/b);
            return 0;
        }
    };
    this.fight = function(toObj)  {                                                                      //скільки завдаємо урону іншому об"єкту
        var distance = v2d.distance(this.getPos(), toObj);
        //distance = (distance>0 && distance <1) ? 1 : Math.floor(distance);
        var uron = (distance <= this.range) && (this.health > 0)? power : 0;//(this.power+this.clan.clanpower)/ distance;
        return uron;
    };
    this.getPos = function(){
        return{x:this.x, y:this.y};                                                                // поточна позиція об"єкта
    }
    this.healthTo = function(uron){                                                                      //скільки отримаемо урону
        this.health -=uron;
        if(this.health >0)
        {return true;}                      //ще живий
        else
        {
            this.health = 0;
            this.moveTo = function(){};
            return false;                   //мертві бджоли не гудуть
        };
    };
};
var SuperItem = function (weapon, shield, bonusrange, obj){
    var self = this;
    self.bonusrange = bonusrange ? bonusrange : 0;
    self.weapon = weapon ? weapon : 0;
    self.shield = shield ? shield : 0;
    this.setWeapon = function(val){ self.weapon = val; return;};
    this.setShield = function(val){ self.shield = val; return;};
    //this.moveTo = function(a,b){ self.moveTo(a,b); return;};
    if (obj) Item.call(this, obj.x,obj.y,obj.health, obj.power,obj.speed,obj.range, obj.jumped,obj.flyed,obj.clan,obj.opwind, obj.openvi);

    this.fight = function(toObj)  {                                                                      //скільки завдаємо урону іншому об"єкту
        var distance = v2d.distance(this.getPos(), toObj);
        //distance = (distance>0 && distance <1) ? 1 : Math.floor(distance);
        var uron =  (distance <= this.range+this.bonusrange) && (this.health > 0)? (this.power+this.clan.clanpower+this.weapon): 0;
        return uron;
    };
    this.healthTo = function(uron){                                                                      //скільки отримаемо урону
        uron = uron <= this.shield ? 0 :uron-this.shield;
        //console.log(this.health,uron);
        this.health -=uron;
        if(this.health >0)
        {return true;}                      //ще живий
        else
        {
            this.health = 0;
            this.moveTo = function(){};
            return false;                   //мертві бджоли не гудуть
        };

    };
};
SuperItem.prototype = new Item();
SuperItem.prototype.constructor = SuperItem;

var MegaItem = function (multi, obj){
    var self = this;
    self.multi = multi ? multi : 1;
    self.bonusrange = obj.bonusrange *self.multi;
    self.weapon = obj.weapon *self.multi;
    self.shield = obj.shield *self.multi;
    if (obj) SuperItem.call(this, self.weapon, self.shield, self.bonusrange, obj);
};
MegaItem.prototype = new SuperItem(0,0,0,new Item());
MegaItem.prototype.constructor = MegaItem;

module.exports.Item = Item;
module.exports.SuperItem = SuperItem;
module.exports.MegaItem = MegaItem;
