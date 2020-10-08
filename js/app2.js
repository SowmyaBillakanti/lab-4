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
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  $('main').append(html);
};

Photo.readJson =() => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  }

  $.ajax('data/page-2.json', ajaxSettings)
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
    $(`.${item}`).show();
  })
}

