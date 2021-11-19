import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');

let searchImage = "";
let page = 1;
let imageLimit = 3;


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
        galleryList.innerHTML = imageCardData.reduce((imagesList, { webformatURL, tags, likes, views, comments, downloads }) => {
            const template = `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                    </p>
                </div>
                </div>`;
        return imagesList + template; 
        }, '')
    }
};

function onLoadMoreCreateCard(image) {
    const imageCardData = image.data.hits;
    
    imageCardData.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
       const string = `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                    </p>
                </div>
                </div>`;
        galleryList.insertAdjacentHTML('beforeend', string);
    })
 }

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
}














// Первый вариант слушателя на форме:

// searchForm.addEventListener('submit', event => {
//     // event.preventDefault();

//     searchImage = searchForm.searchQuery.value.trim();
//     getImages(searchImage).then(onSubmitcreateCard);
// });