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
var maxClicks = 25;

function Product(imagePath) {
  this.name = formatProductName(imagePath);
  this.imagePath = imagePath,
  this.clicks = 0,
  this.views = 0,
  this.updateClicks = function() {
    this.clicks++;
  },
  this.updateViews = function() {
    this.views++;
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
      allProducts[randomProduct].updateViews();
      previousProducts.push(allProducts[randomProduct]);
      results.push(allProducts[randomProduct]);
      i++;
    }
  }
  previousProducts = results;
  return results;
}

function createElements(tag, classes, parent, name, src) {
  var elToCreate = document.createElement(tag);
  classes.forEach(function(name) {
    elToCreate.classList.add(name);
  });
  if (tag === 'img') {
    elToCreate.setAttribute('data-name', name);
  }
  if (src) {
    elToCreate.setAttribute('src', src);
  }
  if (tag !== 'img') {
    elToCreate.innerHTML = name;
  }
  parent.appendChild(elToCreate.cloneNode(true));
}

function chooseImage(event) {
  if (totalClicks < maxClicks) {
    showProducts();
    allProducts.forEach(function(product) {
      if (event.target.getAttribute('data-name') === product.name) {
        product.updateClicks();
      }
    });
    totalClicks++;
  } else {
    allProducts.forEach(function(product) {
      // displayResults
    });
  }
}

function showProducts() {
  var productImagesEl = document.getElementById('products__images');
  var productNamesEl = document.getElementById('products__names');
  productImagesEl.innerHTML = '';
  productNamesEl.innerHTML = '';
  var currentProducts = pickProducts();
  currentProducts.forEach(function(product) {
    createElements('img', ['products__image'], productImagesEl, product.name, product.imagePath);
    createElements('h1', ['products__name'], productNamesEl, product.name);
  });
  var productImages = Object.values(document.getElementsByClassName('products__image'));
  productImages.forEach(function(product) {
    product.addEventListener('click', chooseImage);
  });
}

showProducts();