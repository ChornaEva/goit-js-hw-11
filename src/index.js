import './css/styles.css';
import Notiflix from 'notiflix';
import {getImages} from "./api"

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');

let searchImage = "";
let page = 1;
let imageLimit = 40;
let totalHits;


searchForm.addEventListener('submit', onSubmit);
loadMoreButton.addEventListener('click', onLoadMore);


function onSubmitcreateCard(image) {

    const imageCardData = image.data.hits;
    
    if (imageCardData.length === 0) {
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
    }
    else{
        galleryList.innerHTML = imageCardData.reduce((imagesList, { webformatURL, tags, likes, views, comments, downloads }) => {
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
        }, '');
    }
};

function onLoadMoreCreateCard(image) {
    const imageCardData = image.data.hits;
    totalHits = image.data.totalHits;
    
    imageCardData.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
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

async function onLoadMore() {
    if (page * imageLimit >= totalHits) {
        loadMoreButton.classList.add('is-hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    } else {
        page += 1;
        const images = await getImages(searchImage, page, imageLimit);
        onLoadMoreCreateCard(images);
    }
};

async function onSubmit(event) {
    event.preventDefault();
    page = 1;

    loadMoreButton.classList.add('is-hidden');
    searchImage = searchForm.searchQuery.value.trim();

    const images = await getImages(searchImage, page, imageLimit);
    onSubmitcreateCard(images);

    loadMoreButton.classList.remove('is-hidden');
};