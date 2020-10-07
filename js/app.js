'use strict';

const animalArray = [];

function Photo(photo){
  this.image_url = photo.image_url;
  this.title = photo.title;
  this.description = photo.description;
  this.keyword = photo.keyword;
  this.horns = photo.horns;
  animalArray.push(this);
}

Photo.prototype.render = function() {
  let $photoClone = $('#photo-template').clone();
  $('main').append($photoClone);
  $photoClone.find('h2').text(this.title);
  $photoClone.find('img').attr('src', this.image_url);
  $photoClone.find('p').text(this.description);
  $photoClone.removeClass('#photo-template');
  $photoClone.attr('class', this.keyword);
};

Photo.readJson =() => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  }

  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let photo = new Photo(item);
        photo.render();
      })
      createAnimalArr();
      populateDropdown();
      selectedItems();
      $('#photo-template').hide();
    })
}

$(() => Photo.readJson());

const keywordArr = [];

function createAnimalArr() {
  animalArray.forEach(object => {
    if (!keywordArr.includes(object.keyword)) {
      keywordArr.push(object.keyword);
    }
  })
}

function populateDropdown () {
  keywordArr.forEach(keyword => {
    $('#select-keyword').append(`<option value=${keyword}>${keyword}</option>`);
  })
}



let selectedItems = () => {
  $('select').on('change', function() {
    let item = this.value;
    console.log(item);
    $('section').hide();
    animalArray.forEach(object => {
      if (item === object.keyword) {
        let showOnlyClass = item;
        $('.' + showOnlyClass).show();
      }
    })
  })
}

