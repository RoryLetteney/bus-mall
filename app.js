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
  new Product('img/sweep.png'),
  new Product('img/tauntaun.jpg'),
  new Product('img/unicorn.jpg'),
  new Product('img/usb.gif'),
  new Product('img/water-can.jpg'),
  new Product('img/wine-glass.jpg')
];
var previousProducts = [];
var totalClicks = 0;
var numProdToShow = 3;

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

function randomProductIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function pickProducts() {
  var results = [];
  var i = 0;
  while (i < numProdToShow) {
    var randomProduct = randomProductIndex();
    if (!previousProducts.includes(allProducts[randomProduct])) {
      previousProducts.push(allProducts[randomProduct]);
      results.push(allProducts[randomProduct]);
      i++;
    }
  }
  previousProducts = results;
  return results;
}

function createElements(tag, classes, parent, src) {
  var elToCreate = document.createElement(tag);
  classes.forEach(function(name) {
    elToCreate.classList.add(name);
  });
  if (src) {
    elToCreate.setAttribute('src', src);
  }
  parent.appendChild(elToCreate.cloneNode(true));
}

function showProducts() {
  var productsSection = document.getElementById('products');
  var currentProducts = pickProducts();
  currentProducts.forEach(function(product) {
    createElements('img', ['products__image'], productsSection, product.imagePath);
  });
}

showProducts();