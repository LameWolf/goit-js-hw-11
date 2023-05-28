import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getRefs from './js/getRefs.js';
import PicturesService from './js/PicturesService.js';
import LoadMoreBtn from './js/LoadMoreBtn.js';
import {
  getFetchEndMessage,
  getFailureMessage,
  getWarningMessage,
} from './js/notification.js';
import { renderPhotoCard } from './js/render.js';

let totalImg = 0;
const refs = getRefs();
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const picturesService = new PicturesService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

const onSearch = async evt => {
  evt.preventDefault();
  const form = evt.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  if (value === '') {
    return getWarningMessage();
  }

  picturesService.searchQuery = value;
  loadMoreBtn.show();
  picturesService.resetPage();
  totalImg = 0;
  clearPicturesList();
  await fetchHits();
  form.reset();
};

const fetchHits = async () => {
  loadMoreBtn.disable();

  try {
    const markup = await getHitsMarkup();
    if (!markup) throw new Error('No data');
    updatePicturesList(markup);
  } catch (err) {
    console.log(err);
    loadMoreBtn.hide();
  }

  loadMoreBtn.enable();
};

const getHitsMarkup = async () => {
  try {
    const data = await picturesService.getData();
    totalImg += data.hits.length;
    if (data.hits.length === 0) {
      loadMoreBtn.enable();
      loadMoreBtn.hide();
      return getFailureMessage();
    }
    if (data.hits.length < 40 || totalImg >= data.totalHits) {
      loadMoreBtn.disable();
      loadMoreBtn.hide();
      getFetchEndMessage();
    }

    const markup = data.hits.reduce(
      (markup, hit) => markup + renderPhotoCard(hit),
      ''
    );

    return markup;
  } catch (err) {
    console.log(err);
  }
};

const updatePicturesList = markup => {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
};

const clearPicturesList = () => {
  refs.gallery.innerHTML = '';
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchHits);
