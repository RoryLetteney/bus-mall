'use strict';

var allProducts = [
  new Product('img/bag.jpg'),
  new Product('img/banana.jpg'),
  new Product('img/bathroom.jpg'),
  new Product('img/boots.jpg'),
  new Product('img/breakfast.jpg'),
  new Product('img/bubblegum.jpg'),
  new Product('img/chair.jpg'),
  new Product('img/cthulhu.jpg'),
  new Product('img/dog-duck.jpg'),
  new Product('img/dragon.jpg'),
  new Product('img/pen.jpg'),
  new Product('img/pet-sweep.jpg'),
  new Product('img/scissors.jpg'),
  new Product('img/shark.jpg'),
  new Product('img/sweep.jpg'),
  new Product('img/tauntaun.jpg'),
  new Product('img/unicorn.jpg'),
  new Product('img/usb.gif'),
  new Product('img/water-can.jpg'),
  new Product('img/wine-glass.jpg')
];
var previousImages = [];
var totalClicks = 0;

function formatProductName(string) {
  var stringManipulation = '';
  var result = [];
  stringManipulation = string.slice((string.indexOf('/') + 1), string.indexOf('.'));
  stringManipulation = stringManipulation.split('-');
  stringManipulation.forEach(function(word) {
    result.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return result.join(' ');
}

function Product(imagePath) {
  this.name = formatProductName(imagePath);
  this.imagePath = imagePath,
  this.clicks = 0,
  this.views = 0,
  this.updateClicks = function() {
    this.clicks++;
  },
  this.updateViews = function() {
    this.view++;
  };
}

