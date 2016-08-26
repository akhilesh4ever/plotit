var canvas = new fabric.Canvas('plotitCanvas');
function getPxFromInch(distance){
    var maxDistance = 96;
    var maxPx = 1600;
    console.log('distance px->'+(parseInt((maxPx/(maxDistance*2))*distance)));
    return parseInt((maxPx/(maxDistance*2))*distance);
};
function getInchFromPx(distance){
    distance = distance<0?distance*-1:distance; //convert -ve distance to +ve
    var maxDistance = 96;
    var maxPx = 1600;
    console.log('distance in->'+(parseInt(distance/(maxPx/(maxDistance*2)))));
    return parseInt(distance/(maxPx/(maxDistance*2)));
};
var coordinates = [];
module.exports = {
    drawDistanceToWall : function(distance, direction){
        var x2 = (direction==='right')?(400+getPxFromInch(distance)):(direction==='left')?(400-getPxFromInch(distance)):400;
        var y2 = (direction==='front')?(400-getPxFromInch(distance)):(direction==='back')?(400+getPxFromInch(distance)):400;
        canvas.add(new fabric.Line([400, 400,
            x2,
            y2], {
            stroke: 'black'
        }));
        coordinates.push({
            x:x2,
            y:y2,
            direction:direction
        });
    },
    reStart : function(){
        canvas.clear();
        coordinates = [];
    },
    finishDrawing: function(){
        var newCoordinates = [];
        for(var i=0;i<4;i++){
            newCoordinates[i]={};
        }
        canvas.clear();
        coordinates.sort(function(a,b){
            var order = {
                right:0,
                left:1,
                front:2,
                back:3
            };
            return order[a.direction] - order[b.direction];
        });
        newCoordinates[0].x = coordinates[0].x;
        newCoordinates[1].x = coordinates[1].x;
        newCoordinates[3].x = coordinates[0].x;
        newCoordinates[2].x = coordinates[1].x;

        newCoordinates[0].y = coordinates[2].y;
        newCoordinates[1].y = coordinates[2].y;
        newCoordinates[2].y = coordinates[3].y;
        newCoordinates[3].y = coordinates[3].y;
        var start = newCoordinates[3];
        for(var i=0;i<newCoordinates.length;i++){
            canvas.add(new fabric.Line([start.x, start.y,
                newCoordinates[i].x,
                newCoordinates[i].y], {
                stroke: 'black'
            }));
            var text = new fabric.Text(getInchFromPx((start.x-newCoordinates[i].x)+(start.y-newCoordinates[i].y))+'"', {
                fontFamily: 'Delicious_500',
                left: (start.x+newCoordinates[i].x)/2,
                top: (start.y+newCoordinates[i].y)/2
            });
            text.scale(0.5);
            canvas.add(text);
            start = newCoordinates[i];
        }


    }
};
//function search(coordinates, name) {
//    var results;
//    name = name.toUpperCase();
//    results = source.filter(function(entry) {
//        return entry.name.toUpperCase().indexOf(name) !== -1;
//    });
//    return results;
//}