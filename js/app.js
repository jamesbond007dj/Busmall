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
  liEl.textContent = `${this.votes} votes & ${this.views} views for ${this.name}`;
  ulEl.appendChild(liEl);
};

function generateList(){
  for(var i =0; i < allProducts.length; i++){
    allProducts[i].renderResults();
  }
}


var ctx = document.getElementById('chart').getContext('2d');

var allTheData = [
  {
    name: "John",
    clicks: 17,
    views: 100,
  },
  {
    name: "Cathy",
    clicks: 21,
    views: 77,
  },
  {
    name: "Zach",
    clicks: 13,
    views: 111,
  },
  {
    name: "Allie",
    clicks: 54,
    views: 71,
  },
];

var labels = [];
var data1 = [];
var data2 = [];
var data3 = [];
var colors = ['black', 'ivory', 'blue', 'red'];

for (var i = 0; i < images.length; i++) {
 
  labels.push(images[i].name);
  data1.push(images[i].clicks);
  data2.push(images[i].views);
  data3.push(images[i].clicks+images[i].views);
}


makeChart(labels, data1, data2, data3);



function makeChart(data, labels) {



  var chart = new Chart(ctx, {

    

    type: 'bar',



      data: {

      labels: labels,
        
      datasets: [{

        label: 'FILBACK',

        backgroundColor: 'rgb(155, 09, 000)',

        borderColor: 'rgb(255, 99, 132)',

        data: data1,

        
      },
    
      {label: 'PP TWINES',

      backgroundColor: 'rgb(205, 49, 100)',

      borderColor: 'rgb(205, 49, 132)',

      data: data2,},

    
      {label: 'PP WOVEN FABRICS',

      backgroundColor: 'rgb(005, 09, 100)',

      borderColor: 'rgb(005, 49, 132)',

      data: data3,}
    
    ]

    },

    options: {}

  });



}
