'use strict';

var productOneEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('productThree');
var productContainerEl = document.getElementById('productContainer');
var votesRemaining = 0;
var ulEl = document.getElementById('list');



var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var recentRandomProduct = [];
var allProducts =[];

function Products(name){
  this.name = name.split('.')[0];
  this.filepath = `/assets/images/${name}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

for(var i =0; i < images.length; i++){
  new Products(images[i]);
}

function render(){
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


function randomNumber(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueProduct(){
  var randomIndex = randomNumber(0, allProducts.length - 1);
  while(recentRandomProduct.includes(randomIndex)){
    randomIndex = randomNumber(0, allProducts.length -1);
  }
  if(recentRandomProduct.length > 5){
    recentRandomProduct.shift();
  }
  recentRandomProduct.push(randomIndex);
  
  return randomIndex;
}

function handleClick(){
  var chosenProduct = event.target.title;
  votesRemaining++;

  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].name === chosenProduct){
      allProducts[i].votes++;
    }
  }
  if (votesRemaining > 24){
    productContainerEl.removeEventListener('click', handleClick, true);
    generateList();
  }
  render();
}
productContainerEl.addEventListener('click', handleClick, true);

render();

Products.prototype.renderResults = function(){
  var liEl = document.createElement('li');
  liEl.textContent = `${this.votes} votes for ${this.name}`;
  ulEl.appendChild(liEl);
};

function generateList(){
  for(var i =0; i < allProducts.length; i++){
    allProducts[i].renderResults();
  }
}