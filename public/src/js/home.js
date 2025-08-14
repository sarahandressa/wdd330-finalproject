import { getClubs } from './club.js';

function renderClubList() {
  const clubs = getClubs();
  const container = document.getElementById('clubList');

  if (!container) return;

  container.innerHTML = '';

  if (clubs.length === 0) {
    container.innerHTML =
      '<p>No clubs created yet. Create one to get started!</p>';
    return;
  }

  clubs.forEach((club) => {
    const card = document.createElement('div');
    card.classList.add('club-card');

    card.innerHTML = `
      <h3>${club.name}</h3>
      <p>${club.description}</p>
      <small>${club.members.length} members</small>
      <a href="club.html?id=${club.id}" class="btn">View Club</a>
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderClubList);
