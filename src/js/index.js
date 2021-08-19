import photoCardTpl from '../templates/photo-card.hbs';
import NewsApiService from './apiService';
import debounce from 'lodash.debounce';


const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
}

const newsApiService = new NewsApiService();

const debouncedHandleInput = debounce(onSearch, 500);

refs.searchForm.addEventListener('input', debouncedHandleInput);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();
    newsApiService.query = e.target.value.trim();
    newsApiService.resetPage();
    newsApiService.fetchPhotos().then(appendPhotosMarkup);
}

function onLoadMore() {
    newsApiService.fetchPhotos().then(appendPhotosMarkup);
}

function appendPhotosMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', photoCardTpl(hits));
}


