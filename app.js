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
var numProdToShow = 5;
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
  if (tag === 'img' || tag === 'h1') {
    elToCreate.setAttribute('data-name', name);
    elToCreate.setAttribute('style', `width:${100/numProdToShow}%`);
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
    displayResults();
    var productImages = Object.values(document.getElementsByClassName('products__image'));
    productImages.forEach(function(product) {
      product.removeEventListener('click', chooseImage);
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

function displayResults() {
  var resultsListEl = document.getElementById('results__list');
  var labelArray = [];
  var clicksArray = [];
  var colorsArray = [];
  document.getElementById('products').style.display = 'none';
  function randomColor() {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
  }
  allProducts.forEach(function(product) {
    if (product.clicks > 0) {
      labelArray.push(product.name);
      clicksArray.push(product.clicks);
      colorsArray.push(randomColor());
    }
  });
  allProducts.forEach(function(product) {
    if (product.clicks > 0) {
      createElements('li', ['results__list__item'], resultsListEl, `${product.name}: ${product.clicks} votes`);
    }
  });
  var canvas = document.getElementById('chart').getContext('2d');
  var resultsChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [{
        label: '# of Votes',
        data: clicksArray,
        backgroundColor: colorsArray
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

showProducts();