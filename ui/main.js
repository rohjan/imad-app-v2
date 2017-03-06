// submit user name/password to login

var submit = document.getElementById('submit_btn');

submit.onclick = function() {
    //make a request to the server and send the name
    var request = new XMLHttpRequest();

    //capture the request and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200) {
                alert("Logged in sucessfully");
            }
            else if (request.status === 403) {
                alert("Incorrect password");
            }
            else if (request.status === 500) {
                alert("Something went wrong in the server");
            }
        }
    };

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    //Make the request
    request.open('POST','http://rohjan.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

/*
// counter code
var button = document.getElementById('counter');

button.onclick = function() {
    
    //create a request object
    var request = new XMLHttpRequest();

    //capture the request and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200) {
                //Capture a list of names and render it as a list
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML= counter.toString();
            }
        }
    };
    
    //Make the request
    request.open('GET','http://rohjan.imad.hasura-app.io/counter', true);
    request.send(null);
};


// submit name
var submit = document.getElementById('submit_btn');

submit.onclick = function() {
    //make a request to the server and send the name
    var request = new XMLHttpRequest();

    //capture the request and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200) {
                //Capture a list of names and render it as a list
                var names = request.responseText;
                names =  JSON.parse(names);
                var list = '';
                for(var i=0;i<names.length;i++){
                    list += '<li>'+names[i]+'</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };

    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    //Make the request
    request.open('GET','http://rohjan.imad.hasura-app.io/submit-name?name='+name, true);
    request.send(null);
};
*/

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
    //render the variable in the correct span
    //counter +=1;
    //var span=document.getElementById('count');
    //span.innerHTML = counter.toString();
