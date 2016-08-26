var plotit = require('./plotit');
var direction = 'right';
const {ipcRenderer} = require('electron');
ipcRenderer.on('responseForCurrentDistance', (event, arg) => {
    plotit.drawDistanceToWall(arg, direction);

});
$("#MRight").click(function(){
    direction = 'right';
    ipcRenderer.send('requestForCurrentDistance', 0);
});
$("#MLeft").click(function(){
    direction = 'left';
    ipcRenderer.send('requestForCurrentDistance', 0);
});
$("#MFront").click(function(){
    direction = 'front';
    ipcRenderer.send('requestForCurrentDistance', 0);
});
$("#MBack").click(function(){
    direction = 'back';
    ipcRenderer.send('requestForCurrentDistance', 0);
});
$("#Restart").click(function(){
    plotit.reStart();
});
$("#Done").click(function(){
    plotit.finishDrawing();
});