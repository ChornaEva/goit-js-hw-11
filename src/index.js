import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');

let searchImage = "";
let page = 1;
let imageLimit = 40;


searchForm.addEventListener('submit', onSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

function getImages(searchImage) {
    return axios.get(`/?key=24369719-4937f00e9b76df3c43c2e5aa7&q=${searchImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${imageLimit}&page=${page}`);
};


function onSubmitcreateCard(image) {

   const imageCardData = image.data.hits;

    if (imageCardData.length === 0) {
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
    }
    else{
        galleryList.innerHTML = imageCardData.reduce((imagesList, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
            const template = `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy width=60px" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes: <span class=info-item-color>${likes}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Views: <span class=info-item-color>${views}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Comments: <span class=info-item-color>${comments}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: <span class=info-item-color>${downloads}</span></b>
                    </p>
                </div>
                </div>`;
        return imagesList + template; 
        }, '')
    }
};

function onLoadMoreCreateCard(image) {
    const imageCardData = image.data.hits;
    
    imageCardData.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
       const string = `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                <div class="info">
                    <p class="info-item">
                    <b>Likes: <span class=info-item-color>${likes}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Views: <span class=info-item-color>${views}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Comments: <span class=info-item-color>${comments}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: <span class=info-item-color>${downloads}</span></b>
                    </p>
                </div>
                </div>`;
        galleryList.insertAdjacentHTML('beforeend', string);
    })
};

function onLoadMore() {
    page += 1;
    getImages(searchImage).then(onLoadMoreCreateCard);
    
console.log(page);
};

function onSubmit() {
    event.preventDefault();
    page = 1;
    searchImage = searchForm.searchQuery.value.trim();
    getImages(searchImage).then(onSubmitcreateCard); 
};




// largeImageURL (работает, но не получает большую картинку):
const openLargeImage = (event) => {
    event.preventDefault();

    const largeImage = event.target.dataset.source;
    const modalWindow = basicLightbox.create(`<img width="1400" height="900" src="${largeImage}">`);
    modalWindow.show();
}
    
document.addEventListener("keydown", event => {
    if (event.key === 'Escape') {
      modalWindow.close();
      document.removeEventListener("keydown", openLargeImage);
    }
  })

galleryList.addEventListener('click', openLargeImage);









// Первый вариант слушателя на форме:

// searchForm.addEventListener('submit', event => {
//     // event.preventDefault();

//     searchImage = searchForm.searchQuery.value.trim();
//     getImages(searchImage).then(onSubmitcreateCard);
// });