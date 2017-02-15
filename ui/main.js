//console.log('Loaded!');

// change the text of main-text element

//var element = document.getElementById('main-text');
//element.innerHTML = 'New Value';
// Move the image
//var img = document.getElementById('madi');
//var marginLeft=0;
//function moveRight() {
//    marginLeft = marginLeft + 1;
//    img.style.marginLeft = marginLeft + 'px';
//}
//img.onclick = function() {
//    //img.style.marginLeft='100px';
//    var interval = setInterval(moveRight,50);
//};
// counter code

var button = document.getElementById('counter');
var counter = 0;

button.onclick = function() {
    // make request to the counter end point
    
    //capture the response and store the variable
    
    //render the variable in the correct span
    counter +=1;
    var span=document.getElementById('count');
    span.innerHTML = counter.toString();
};
    