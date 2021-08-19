export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhotos(searchQuery) {

        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22986442-fd6d86129fbc450d958a17aa8`)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            }).catch(error => Promise.reject(error));
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}


