import { Notify } from 'notiflix';

// const getSuccessMessage = total => {
//   Notify.success(`"Hooray! We found ${total} images."`);
// };

const getFetchEndMessage = () => {
  Notify.info("We're sorry, but you've reached the end of search results.");
};

const getFailureMessage = () => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};

const getWarningMessage = () => {
  Notify.warning('Query field cannot be empty!');
};

export { getFetchEndMessage, getFailureMessage, getWarningMessage };
