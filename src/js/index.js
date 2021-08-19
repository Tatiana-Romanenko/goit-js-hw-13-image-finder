import photoCardTpl from '../templates/photo-card.hbs';
import NewsApiService from './apiService';
import debounce from 'lodash.debounce';


const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
}

const newsApiService = new NewsApiService();

const debouncedHandleInput = debounce(onSearch, 1000);

refs.searchForm.addEventListener('input', debouncedHandleInput);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.classList.add('visually-hidden');

function onSearch(e) {
    e.preventDefault();


    newsApiService.query = e.target.value.trim();
    newsApiService.resetPage();
    newsApiService.fetchPhotos().then(hits => {
        clearGalleryContainer();
        appendPhotosMarkup(hits);
    });
}

function onLoadMore() {
    newsApiService.fetchPhotos().then(appendPhotosMarkup);
}

function appendPhotosMarkup(hits) {
    if (hits.length !== 0) {
        refs.galleryContainer.insertAdjacentHTML('beforeend', photoCardTpl(hits));
        refs.loadMoreBtn.classList.remove('visually-hidden');
        refs.loadMoreBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }
    if (hits.length < 12) {
        refs.loadMoreBtn.classList.add('visually-hidden');
    }
}



function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}


