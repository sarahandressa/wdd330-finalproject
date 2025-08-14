import { initClubCreation, getClubs } from './club.js';
import { initBookSearch } from './ui.js';

function renderClubs() {
  const clubs = getClubs();
  const container = document.getElementById('clubListContainer');
  if (!container) return;

  container.innerHTML = '';
  if (clubs.length > 0) {
    const list = document.createElement('ul');
    clubs.forEach(club => {
      const item = document.createElement('li');
      item.textContent = `${club.name} - ${club.description}`;
      list.appendChild(item);
    });
    container.appendChild(list);
  } else {
    container.innerHTML = '<p>No clubs created yet. Use the form above to create one.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initClubCreation(() => {
    // Callback para renderizar os clubes após a criação
    renderClubs();
  });
  
  renderClubs(); // Renderiza na carga inicial da página

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
          `Book "${book.title}" suggested to club "${clubs[0].name}".`,
        );
      }
    });
  });
});