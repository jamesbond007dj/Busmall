var productimages = [
    '/assets/images/bag.jpg', 
    '/assets/images/banana.jpg', 
    '/assets/images/bathroom.jpg', 
    '/assets/images/boots.jpg', 
    '/assets/images/breakfast.jpg', 
    '/assets/images/bubblegum.jpg', 
    '/assets/images/chair.jpg', 
    '/assets/images/cthulhu.jpg', 
    '/assets/images/dog-duck.jpg', 
    '/assets/images/dragon.jpg', 
    '/assets/images/pen.jpg', 
    '/assets/images/pet-sweep.jpg', 
    '/assets/images/scissors.jpg', 
    '/assets/images/shark.jpg', 
    '/assets/images/sweep.png', 
    '/assets/images/tauntaun.jpg',
    '/assets/images/unicorn.jpg',
    '/assets/images/usb.gif', 
    '/assets/images/water-can.jpg', 
    '/assets/images/wine-glass.jpg', ];

    var productimages  = ['bag.jpg', 'banana.jpg', 'bathroom.jpg',
     'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg',
      'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
       'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg',
       'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var recentRandomProduct = [];
var allProducts =[];

'use strict';

var productOneEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('productThree');
var productContainerEl = document.getElementById ('productContainer');
var votesRemaining = 0; 
var ulEl = document.getElementById('list');

var images  = ['bag.jpg', 'banana.jpg', 'bathroom.jpg',
     'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg',
      'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
       'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg',
       'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var recentRandomProducts = [];
var allProducts = [];


function Products (name){
        this.name = name.split('.')[0];
        this.filepath = `/assets/images/${name}`;
        this.votes = 0;
        this.views = 0;
        allProducts.push(this);
    }
   

for (var i = 0; i < images.length; i++) {
    new Products (images[i]);
}

function render () {
    var randomProducts = getUniqueProduct();
    allProducts[randomProducts].views++;
    productOneEl.src = allProducts[randomProducts].filepath;
    productOneEl.alt = allProducts[randomProducts].name;
    productOneEl.title = allProducts[randomProducts].name;


    randomProducts = getUniqueProduct();
    allProducts[randomProducts].views++;
    productTwoEl.src = allProducts[randomProducts].filepath;
    productTwoEl.alt = allProducts[randomProducts].name;
    productTwoEl.title = allProducts[randomProducts].name;

    randomProducts = getUniqueProduct(); 
    allProducts[randomProducts].views++;
    productThreeEl.src = allProducts[randomProducts].filepath;
    productThreeEl.alt = allProducts[randomProducts].name;
    productThreeEl.title = allProducts[randomProducts].name;

    
}

function randomNumber (min, max) {
    return Math.floor(Math.random()*(max -min+1))+min;
}

function getUniqueProduct(){
    var randomIndex = randomNumber(0, allProducts.length-1);
    while(recentRandomProduct.includes(randomIndex)){ 
    randomIndex= randomNumber(0, allProducts.length-1);
    }

    if(recentRandomProduct.length > 5) {
        recentRandomProduct.shift();
    }
    recentRandomProduct.push(randomIndex);

    return randomIndex;

}

function mouseClick () {
    var chosenProduct = event.target.title;
    votesRemaining++;

    for ( var i = 0; i < allProducts.length; i++){
        if(allProducts[i].name === chosenProduct){
            allProducts[i].votes++;
        }
    }

    if (votesRemaining > 24){
        productContainerEl.removeEventListener('click', mouseClick, true);
        generateList();
    }
    render ();
}

productContainerEl.addEventListener('click', mouseClick, true);

render();

Products.prototype.renderResults = function (){
    var liEl = document.createElement('li');
    liEl.textContent = `${this.selections} votes for ${this.name}`;
    ulEl.appendChild(liEl);
};

function generateList () {
    for (var i=0; i<allProducts.length; i++){
        allProducts[i].renderResults();
    }
}