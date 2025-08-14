import { initClubCreation } from './club.js';
import { initBookSearch } from './ui.js';

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
