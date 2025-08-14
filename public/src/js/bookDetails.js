import { getClubs, suggestBookToClub } from './club.js';
import { initBookSearch } from './ui.js';
import { surpriseBook } from './surpriseBook.js';

// Função para renderizar os detalhes do clube
function renderClubDetails(club) {
  const title = document.querySelector('.intro h2');
  if (title) title.textContent = club.name;

  const suggestionsList = document.getElementById('suggestionsList');
  if (suggestionsList) {
    suggestionsList.innerHTML = '';
    if (club.suggestions && club.suggestions.length > 0) {
      club.suggestions.forEach(s => {
        const div = document.createElement('div');
        div.classList.add('book-suggestion-item');
        div.innerHTML = `
          <h4>${s.title}</h4>
          <p><em>${s.authors.join(', ') || 'Unknown Author'}</em></p>
          <img src="${s.thumbnail || '/images/no-cover.png'}" alt="Cover of ${s.title}" />
        `;
        suggestionsList.appendChild(div);
      });
    } else {
      suggestionsList.innerHTML = '<p>No book suggestions yet. Search for books above or get a surprise!</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const clubs = getClubs();
  if (clubs.length === 0) {
    const suggestionsSection = document.querySelector('.book-suggestions');
    if(suggestionsSection) {
      suggestionsSection.innerHTML = '<p>Please create a club first to see suggestions and search for books.</p>';
    }
    return;
  }
  
  const club = clubs[0];
  const clubId = club.id;
  renderClubDetails(club);

  initBookSearch((book) => {
    const success = suggestBookToClub(clubId, book);
    if (success) {
      alert(`Book "${book.title}" suggested to club "${club.name}".`);
      renderClubDetails(getClubs()[0]);
    }
  });

  const surpriseBtn = document.getElementById('surpriseBookBtn');
  if(surpriseBtn) {
    surpriseBtn.addEventListener('click', async () => {
      // Verificação adicionada para garantir que um clube existe antes de prosseguir.
      const currentClubs = getClubs();
      if (currentClubs.length === 0) {
        alert('Club not found! Please create a club first.');
        return;
      }
      
      const currentClubId = currentClubs[0].id;
      
      try {
        const surpriseBookData = await surpriseBook();
        if (surpriseBookData) {
          const success = suggestBookToClub(currentClubId, surpriseBookData);
          if (success) {
            alert(`Surprise book "${surpriseBookData.title}" suggested!`);
            renderClubDetails(getClubs()[0]);
          } else {
            alert('Failed to suggest the book.');
          }
        }
      } catch (error) {
        console.error('Error with Surprise Me button:', error);
        alert('Could not get a surprise book. Please try again.');
      }
    });
  }
});