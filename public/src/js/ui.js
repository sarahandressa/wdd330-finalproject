import { searchBooks } from './api.js';
import { initClubCreation } from './club.js';

function createBookCard(book, onSuggest) {
  const { title, authors, thumbnail, description } = book;

  const authorsText = authors
    ? authors.join(', ')
    : 'Unknown author';
  const truncatedDescription = description ? description.substring(0, 150) + '...' : 'No description available';
  
  const card = document.createElement('div');
  card.classList.add('book-card');

  card.innerHTML = `
    <a href="book.html?id=${book.id}">
      <h4>${title || 'No title'}</h4>
      <p><em>${authorsText}</em></p>
      ${thumbnail ? `<img src="${thumbnail}" alt="Cover of ${title || 'Book'}" />` : ''}
      <p>${truncatedDescription}</p>
    </a>
    <button class="suggest-book-btn">Suggest this Book</button>
  `;

  const button = card.querySelector('.suggest-book-btn');
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o link de ser seguido
    if (typeof onSuggest === 'function') onSuggest(book);
  });

  return card;
}

function clearSearchResults(container) {
  container.innerHTML = '';
}

function renderSearchResults(books, container, onSuggest) {
  clearSearchResults(container);

  if (!books || books.length === 0) {
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
  
});