import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const DEBOUNCE_DELAY = 300;
const searchForm = document.querySelector('#search-form');
const loadButton = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');
let searchImage = "";
let imageCardData = '';

searchForm.addEventListener('input', debounce(event => {
    searchImage = searchForm.searchQuery.value.trim();
}, DEBOUNCE_DELAY));

searchForm.addEventListener('submit', event => {
    event.preventDefault();
  getImages(searchImage).then(createCard);
});


 function getImages(searchImage) {
    return axios.get(`/?key=24369719-4937f00e9b76df3c43c2e5aa7&q=${searchImage}&image_type=photo&orientation=horizontal&safesearch=true`);
};


function createCard(image) {

    imageCardData = image.data.hits;

    if (imageCardData.length === '') {
       return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
    }
    else {
    const string = imageCardData.reduce((imagesList, { webformatURL, tags, likes, views, comments, downloads }) => {
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
         },)
        galleryList.innerHTML = string;
    }
}


// function showGalleryProfile() {
//   showImages(gallery);
// }
    
// function inputValidation(string) {
//     if (searchForm.searchQuery.value === "") {
//         galleryList.innerHTML = "";
//     }
//     else {
        
//         fetchCountries(string).then(showGalleryProfile).catch(showError).finally(()=>searchForm.searchQuery.value === "");
//     }
// }