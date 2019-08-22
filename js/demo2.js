'use strict';

var productOneEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('productThree');
var productContainerEl = document.getElementById('productContainer');
var votesRemaining = 0;
var productNames = [];
var totalVotes = [];
var top3Votes = [];
var top3Labels = [];
//var resultsList = document.getElementById('results');

// got this code from class, changed mine after I saw how clean it looked in class
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var recentRandomProduct = [];
var allProducts =[];

function Products(name){
  this.name = name.split('.')[0];
  this.filepath = `img/${name}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

function render(imageEl){
  var randomProducts = getUniqueProduct();
  //console.log('This is the random product: ', randomProducts);
  allProducts[randomProducts].views++;
  imageEl.src = allProducts[randomProducts].filepath;
  imageEl.alt = allProducts[randomProducts].name;
  imageEl.title = allProducts[randomProducts].name;
}

// helper functions!

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
  //console.log('My random index is: ', randomIndex);
  return randomIndex;
}

// from TA Ron and then from class work

function generateArrays(){
  top3Votes = [];
  top3Labels = [];
  for(var i =0; i < allProducts.length; i++){
    productNames.push(allProducts[i].name);
    totalVotes.push(allProducts[i].votes);
  }
  // var sortVotes = totalVotes.sort();
  // sortVotes.reverse();
  // top3Votes.push(sortVotes[0]);
  // top3Votes.push(sortVotes[1]);
  // top3Votes.push(sortVotes[2]);
  // //console.log(sortVotes);

  allProducts.sort(function(a,b){
    return a.votes < b.votes ? 1 : -1;
  });

  var top3Obj = allProducts.slice(0,3);
  for(var j = 0; j < top3Obj.length; j++){
    top3Labels.push(top3Obj[j].name);
    top3Votes.push(top3Obj[j].votes);
  }
}

//LOCAL STORAGE////
function productCrap(){
  var objString = JSON.stringify(allProducts);
  localStorage.setItem('product-key', objString);
}

function storageFinder(){
  var storeProducts = localStorage.getItem('product-key');
  if(localStorage.length === 0){
    for(var i =0; i < images.length; i++){
      new Products(images[i]);
    }
  } else{
    var parseProduct = JSON.parse(storeProducts);
    allProducts = parseProduct;
  }
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: totalVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(130, 91, 169, 0.2)',
          'rgba(101, 145, 13, 0.2)',
          'rgba(240, 71, 91, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(130, 91, 169, 0.2)',
          'rgba(101, 145, 13, 0.2)',
          'rgba(240, 71, 91, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(130, 91, 169, 1)',
          'rgba(101, 145, 13, 1)',
          'rgba(240, 71, 91, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(130, 91, 169, 1)',
          'rgba(101, 145, 13, 1)',
          'rgba(240, 71, 91, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function generatePie(){
  var ctx = document.getElementById('myPieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: top3Labels,
      datasets: [{
        label: 'Top 3 Voted for Items',
        data: top3Votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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
    generateArrays();
    generateChart();
    generatePie();
    productCrap();
  }
  render(productOneEl);
  render(productTwoEl);
  render(productThreeEl);
}
/////executable code////////
storageFinder();

productContainerEl.addEventListener('click', handleClick, true);

render(productOneEl);
render(productTwoEl);
render(productThreeEl);
