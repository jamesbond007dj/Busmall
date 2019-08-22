'use strict';

var imageUrls = [
  '/assets/imgs/bag.jpg',
  '/assets/imgs/banana.jpg',
  '/assets/imgs/bathroom.jpg',
  '/assets/imgs/boots.jpg',
  '/assets/imgs/breakfast.jpg',
  '/assets/imgs/bubblegum.jpg',
  '/assets/imgs/chair.jpg',
  '/assets/imgs/cthulhu.jpg',
  '/assets/imgs/dog-duck.jpg',
  '/assets/imgs/dragon.jpg',
  '/assets/imgs/pen.jpg',
  '/assets/imgs/pet-sweep.jpg',
  '/assets/imgs/scissors.jpg',
  '/assets/imgs/shark.jpg',
  '/assets/imgs/sweep.png',
  '/assets/imgs/tauntaun.jpg',
  '/assets/imgs/unicorn.jpg',
  '/assets/imgs/usb.gif',
  '/assets/imgs/water-can.jpg',
  '/assets/imgs/wine-glass.jpg'
];

var imageNames = [
  'R2D2 Luggage',
  'Banana Cutter',
  'Bathroom Tablet Stand',
  'Toeless Boots',
  'All-in-One Breakfast Maker',
  'Meatball Bubblegum',
  'Hump Chair',
  'Posable Cthulhu',
  'Dog-Duck',
  'Delicious Dragon Meat',
  'Utensil Pen Caps',
  'About-Time Pet Sweep',
  'Pizza Scissors',
  'Shark Simulator',
  'Make-em-Useful Baby Sweep',
  'Life-like Taun Taun',
  'Tasty Unicorn Meat',
  'Not Creepy Tentacle USB',
  'Very Effective Watering Can',
  'Posh Wine Glass'
];

var imageSection = document.getElementById('image_banner');
var repeatCheckArray = [];
var scoresArray = [];
var numberOfLoops = 0;

function Images( name, url ) {
  this.name = name;
  this.src = url;
  this.votes = 0;
  this.shown = 0;
  Images.list.push(this);
}
Images.list = [];

function createImages() {
  for (var i = 0; i < imageUrls.length; i++){
    new Images (imageNames[i], imageUrls[i]);
  }
}

function chooseRandomImage(){
  var randomImage = Math.floor(Math.random() * Images.list.length);
  return Images.list[randomImage];
}

function renderRandomImage(){
  removePreviousImages();
  if (numberOfLoops < 25){
    for (var i = 0; i < 3; i++){
      var randomImage = chooseRandomImage();
      while(repeatCheckArray.includes(randomImage)){
        randomImage = chooseRandomImage();
      }
      createImageElement(randomImage);
      scoresArray[i] = randomImage;
      randomImage.shown++;
      repeatCheckArray.push(randomImage);
    }
    removeThreePreviousImages();
    numberOfLoops++;
  }
  else {
    // listTotals();
    makeChart();
  }
}

function createImageElement(randomImage){
  var newFigure = document.createElement('figure');
  var newImg = document.createElement('img');
  var newCaption = document.createElement('figcaption');
  
  newImg.src = randomImage.src;
  newImg.alt = randomImage.name;
  newCaption.textContent = randomImage.name;
  newFigure.appendChild(newImg);
  newFigure.appendChild(newCaption);
  imageSection.appendChild(newFigure);
}

function removeThreePreviousImages(){
  if(repeatCheckArray.length >= 6){
    repeatCheckArray.shift();
    repeatCheckArray.shift();
    repeatCheckArray.shift();
  }
}

function imageVotedFor(e){
  var clicked = e.target.alt;
  for (var i = 0; i < Images.list.length; i++){
    if (Images.list[i].name === clicked){
      Images.list[i].votes++;
    }
  }
  renderRandomImage();
}

function removePreviousImages (){
  while (imageSection.firstChild){
    imageSection.removeChild(imageSection.firstChild);
  }
}

function totalVotesToArray(){
  var totalsArray = [];
  for(var i = 0; i < Images.list.length; i++){
    totalsArray.push(Images.list[i].votes);
  }
  return totalsArray;
}
function totalViewsToArray(){
  var totalsArray = [];
  for(var i = 0; i < Images.list.length; i++){
    totalsArray.push(Images.list[i].shown);
  }
  return totalsArray;
}
function percentagePickedToArray(){
  var totalsArray = [];
  for(var i = 0; i < Images.list.length; i++){
    var percent = Images.list[i].votes / Images.list[i].shown * 100;
    totalsArray.push(percent);
  }
  return totalsArray;
}

function listTotals(){
  var elUl = document.createElement('ul');
  elUl.textContent = 'Totals:';
  for (var j = 0; j < Images.list.length; j++){
    var elLi = document.createElement('li');
    elLi.textContent = Images.list[j].votes + ' votes for the ' + Images.list[j].name;
    elUl.appendChild(elLi);
  }
  imageSection.appendChild(elUl);
}

function createChart(){
  var elH2 = document.getElementsByTagName('h2')[0];
  elH2.textContent = 'Total Votes Compared to Times Shown Chart';
  var elChart = document.createElement('canvas');
  elChart.id = 'totals_chart';
  imageSection.appendChild(elChart);
  
  //code from https://www.chartjs.org/docs/latest/getting-started/
  var ctx = document.getElementById('totals_chart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    
    // The data for our dataset
    data: {
      labels: imageNames,
      datasets: [
        {
          label: 'Total Votes',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: totalVotesToArray(),
          yAxisID: 'left-y-axis',
        },
        {
          label: 'Total Times Shown',
          backgroundColor: 'blue',
          borderColor: 'rgb(255, 99, 132)',
          data: totalViewsToArray(),
          yAxisID: 'left-y-axis',
        },
        {
          label: 'Percentage Chosen',
          backgroundColor: 'goldenrod',
          data: percentagePickedToArray(),
          type: 'bar',
          yAxisID: 'right-y-axis',
        },
      ]
    },
    
    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Number of Votes',
          }
        }, {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'Percentage Chosen',
          },
          ticks: {
            max: 100,
          }
        }]
      }
    }
  });
}

imageSection.addEventListener('click', imageVotedFor);
createImages();
renderRandomImage();
