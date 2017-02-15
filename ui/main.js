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

button.onclick = function() {
    
    //create a request object
    var request = new XMLHttpRequest();

    //capture the request and store it in a variable
    request.onreadystatechange = function() {
        if (requst.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    
    //Make the request
    request.open('GET','http://rohjan.imad.hasura-app.io/counter', true);
    request.send(null);
    
    //render the variable in the correct span
    //counter +=1;
    //var span=document.getElementById('count');
    //span.innerHTML = counter.toString();
};
    