import { searchBooks } from './api.js';
import { initClubCreation } from './club.js';

function createBookCard(book, onSuggest) {
  const { volumeInfo } = book;
  const title = volumeInfo.title || 'No title';
  const authors = volumeInfo.authors
    ? volumeInfo.authors.join(', ')
    : 'Unknown author';
  const thumbnail = volumeInfo.imageLinks?.thumbnail || '';
  const description = volumeInfo.description || 'No description available';

  const card = document.createElement('div');
  card.classList.add('book-card');

  card.innerHTML = `
    <h4>${title}</h4>
    <p><em>${authors}</em></p>
    ${thumbnail ? `<img src="${thumbnail}" alt="Cover of ${title}" />` : ''}
    <p>${description.substring(0, 150)}...</p>
    <button class="suggest-book-btn">Suggest this Book</button>
  `;

  const button = card.querySelector('.suggest-book-btn');
  button.addEventListener('click', () => {
    if (typeof onSuggest === 'function') onSuggest(book);
  });

  return card;
}

function clearSearchResults(container) {
  container.innerHTML = '';
}

function renderSearchResults(books, container, onSuggest) {
  clearSearchResults(container);

  if (books.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }

  books.forEach((book) => {
    const card = createBookCard(book, onSuggest);
    container.appendChild(card);
  });
}

export function initBookSearch(onSuggest) {
  const input = document.getElementById('bookSearchInput');
  const resultsContainer = document.getElementById('searchResults');

  if (!input || !resultsContainer) return;

  let debounceTimeout;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    const query = input.value.trim();

    debounceTimeout = setTimeout(async () => {
      if (query.length < 3) {
        clearSearchResults(resultsContainer);
        return;
      }

      const books = await searchBooks(query);
      renderSearchResults(books, resultsContainer, onSuggest);
    }, 400);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initClubCreation();

  initBookSearch((book) => {
    import('./club.js').then(({ getClubs, suggestBookToClub }) => {
      const clubs = getClubs();
      if (clubs.length === 0) {
        alert('Please create a club first to suggest books.');
        return;
      }

      const clubId = clubs[0].id;
      const success = suggestBookToClub(clubId, book);
      if (success) {
        alert(
          `Book "${book.volumeInfo.title}" suggested to club "${clubs[0].name}".`,
        );
      }
    });
  });
});
