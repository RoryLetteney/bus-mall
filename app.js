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
  this.color,
  this.updateClicks = function() {
    this.clicks++;
  },
  this.updateViews = function() {
    this.views++;
  },
  this.pickColor = function() {
    this.color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
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
    elToCreate.style.height = `${1000 / numProdToShow}px`;
  }
  if (tag !== 'img') {
    elToCreate.innerHTML = name;
  }
  parent.appendChild(elToCreate.cloneNode(true));
}

function hideProducts() {
  document.getElementById('products').style.display = 'none';
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

function parseLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function generateResults(products) {
  var resultsListEl = document.getElementById('results__list');
  var sortedByClicks = products.sort(function(a, b) { return b.clicks - a.clicks; });

  var labels = [];
  var clicks = [];
  var colors = [];
  for (var product of sortedByClicks) {
    if (product.clicks > 0) {
      labels.push(product.name);
      clicks.push(product.clicks);
      colors.push(product.color);
    }
  }

  var sortedByClickViewRatio = products.sort(function(a, b) { return (Math.round((((b.clicks/b.views).toFixed(2)) * 100))) - (Math.round((((a.clicks/a.views).toFixed(2)) * 100))); });

  sortedByClickViewRatio.forEach(function(product) {
    if (product.clicks > 0) {
      createElements('li', ['results__list__item'], resultsListEl, `${product.name} chosen ${Math.round((((product.clicks/product.views).toFixed(2)) * 100))}% of the time`);
    }
  });

  var chartYMax = Math.max(...clicks) + 1;
  var canvas = document.getElementById('chart').getContext('2d');
  var resultsChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: clicks,
        backgroundColor: colors
      }]
    },
    options: {
      legend: {
        labels: {
          boxWidth: 0
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: chartYMax,
            stepSize: 1
          }
        }]
      }
    }
  });
}

function displayResults() {
  hideProducts();
  localStorage.setItem('productsArray', JSON.stringify(allProducts));
  generateResults(allProducts);
}

(function pageState() {
  if (localStorage.getItem('productsArray')) {
    hideProducts();
    var lsProducts = parseLocalStorage('productsArray');
    generateResults(lsProducts);
  } else {
    for (var product of allProducts) {
      product.pickColor();
    }
    showProducts();
  }
}());