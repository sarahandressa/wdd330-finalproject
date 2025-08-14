import { searchBooks } from './api.js';
import { getClubs, saveClubs } from './club.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchBookForm');
  const resultsContainer = document.getElementById('searchResults');

  if (!form || !resultsContainer) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('bookQuery').value.trim();
    const clubId = form.dataset.clubId;

    if (!query) {
      alert('Enter a term to search.');
      return;
    }

    if (!clubId) {
      console.error('❌ No clubId found onform.dataset.clubId');
      return;
    }

    resultsContainer.innerHTML = '<p>🔍 Searching for books...</p>';

    const books = await searchBooks(query);

    if (books.length === 0) {
      resultsContainer.innerHTML = '<p>No books found.</p>';
      return;
    }

    resultsContainer.innerHTML = '';
    books.forEach((book) => {
      const div = document.createElement('div');
      div.classList.add('book-result');

      div.innerHTML = `
        <img src="${book.thumbnail}" alt="${book.title}">
        <h4>${book.title}</h4>
        <p>${book.authors.join(', ')}</p>
        <button>Sugerir</button>
      `;

      div.querySelector('button').addEventListener('click', () => {
        addBookSuggestion(clubId, book);
        div.querySelector('button').disabled = true;
        div.querySelector('button').textContent = '✅ Suggested';
      });

      resultsContainer.appendChild(div);
    });
  });
});

function addBookSuggestion(clubId, book) {
  const clubs = getClubs();
  const club = clubs.find((c) => c.id === clubId);

  if (!club) {
    console.error(`❌ Club with id ${clubId} not found`);
    return;
  }

  if (!club.suggestions) club.suggestions = [];

  // Evitar duplicatas
  if (club.suggestions.some((s) => s.id === book.id)) {
    alert('This book has already been suggested.');
    return;
  }

  club.suggestions.push(book);
  saveClubs(clubs);
}