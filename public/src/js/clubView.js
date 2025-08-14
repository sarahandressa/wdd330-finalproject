import { getClubs } from './club.js';

function getClubIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderClubDetails() {
  const clubId = getClubIdFromURL();
  const clubs = getClubs();
  const club = clubs.find((c) => c.id === clubId);

  const container = document.getElementById('clubDetails');
  if (!container) return;

  if (!club) {
    container.innerHTML = '<p>Club not found.</p>';
    return;
  }

  container.innerHTML = `
    <h2>${club.name}</h2>
    <p>${club.description}</p>
    <h3>Members</h3>
    <ul>${club.members.map((m) => `<li>${m}</li>`).join('')}</ul>
    <h3>Book Suggestions</h3>
    <div id="suggestionsList"></div>
  `;

  renderSuggestions(club);
}

function renderSuggestions(club) {
  const container = document.getElementById('suggestionsList');
  container.innerHTML = '';

  if (club.suggestions.length === 0) {
    container.innerHTML = '<p>No book suggestions yet.</p>';
    return;
  }

  club.suggestions.forEach((suggestion) => {
    const div = document.createElement('div');
    div.classList.add('book-suggestion');
    div.innerHTML = `
      <img src="${suggestion.thumbnail}" alt="${suggestion.title}">
      <h4>${suggestion.title}</h4>
      <p>${suggestion.authors.join(', ')}</p>
      <p>${suggestion.description}</p>
      <span>Votes: ${suggestion.votes}</span>
    `;
    container.appendChild(div);
  });
}

const searchForm = document.getElementById('searchBookForm');
if (searchForm) {
  searchForm.dataset.clubId = club.id;
}

import('./suggestBook.js');

document.addEventListener('DOMContentLoaded', renderClubDetails);
