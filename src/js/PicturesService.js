const URL = 'https://pixabay.com/api/';
const API_KEY = '22697108-16f99a6bb7067689183444e58';
const axios = require('axios').default;

export default class PicturesService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.per_page = 40;
  }

  async getData() {
    const { data } = await axios.get(
      `${URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
    );
    this.incrementPage();
    return data;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
