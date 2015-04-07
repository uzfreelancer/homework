/**
 * Created by mr_freelancer on 06-Apr-15.
 */
var Stage = function(width,height){
    this.width = width ? width : 800;
    this.height = height ?  height : 600;
    contains = function(point)
    {
        if(point.x <= 0 || point.x >= this.width || point.y <= 0 || point.y >= this.height ) return false;
        return true;
    }

};
module.exports = Stage;