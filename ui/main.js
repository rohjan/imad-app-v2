console.log('Loaded!');

// change the text of main-text element

var element = document.getElementById('main-text');
element.innerHTML = 'New Value';
// Move the image
var img = document.getImageById('madi');
img.onclick = function() {
    img.style.marginLeft='100px';    
};
    
    