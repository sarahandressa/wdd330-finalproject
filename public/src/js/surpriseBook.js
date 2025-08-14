import { getClubs, saveClubs } from './club.js';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

const RANDOM_KEYWORDS = [
  'mystery',
  'romance',
  'fantasy',
  'science fiction',
  'history',
  'self help',
  'biography',
  'thriller',
  'adventure',
  'philosophy',
];

export async function surpriseBook(clubId) {
  try {
    console.log('🎲 Surprise Me! for club:', clubId);

    const randomKeyword =
      RANDOM_KEYWORDS[Math.floor(Math.random() * RANDOM_KEYWORDS.length)];
    console.log(`🔍 Searching books for: ${randomKeyword}`);

    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(randomKeyword)}&maxResults=10`,
    );
    if (!response.ok) throw new Error('Failed to fetch books');

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      alert('No books found for surprise!');
      return;
    }

    const randomBook =
      data.items[Math.floor(Math.random() * data.items.length)];
    const info = randomBook.volumeInfo;

    const suggestion = {
      id: randomBook.id,
      title: info.title || 'Untitled',
      authors: info.authors || ['Unknown author'],
      description: info.description || 'No description available.',
      thumbnail:
        info.imageLinks?.thumbnail ||
        'https://via.placeholder.com/128x195?text=No+Image',
      votes: 0,
      status: 'available',
    };

    const clubs = getClubs();
    const clubIndex = clubs.findIndex((c) => c.id === clubId);
    if (clubIndex === -1) {
      alert('Club not found!');
      return;
    }

    if (!clubs[clubIndex].suggestions) {
      clubs[clubIndex].suggestions = [];
    }

    clubs[clubIndex].suggestions.push(suggestion);
    saveClubs(clubs);

    console.log('✅ Book added:', suggestion);

    import('./clubView.js').then((mod) => {
      if (mod && mod.renderClubDetails) {
        mod.renderClubDetails();
      } else {
        location.reload(); // fallback
      }
    });
  } catch (error) {
    console.error('❌ Error in surpriseBook:', error);
    alert('An error occurred while fetching the surprise book.');
  }
}
