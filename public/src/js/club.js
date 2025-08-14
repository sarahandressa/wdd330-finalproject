const CLUBS_STORAGE_KEY = 'bookClubBliss_clubs';

export function getClubs() {
  const clubs = localStorage.getItem(CLUBS_STORAGE_KEY);
  return clubs ? JSON.parse(clubs) : [];
}

export function saveClubs(clubs) {
  localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(clubs));
}

export function createClub(name, description) {
  const clubs = getClubs();
  const newClub = {
    id: Date.now().toString(),
    name,
    description,
    members: [],
    suggestions: [],
    votes: {},
    readingTimeLine: [],
    discussions: [],
    progress: {},
  };
  clubs.push(newClub);
  saveClubs(clubs);
  return newClub;
}

export function initClubCreation() {
  const form = document.getElementById('createClubForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]').value.trim();
    const description = form.querySelector('textarea').value.trim();

    if (!name || !description) {
      alert('Please fill in both Club Name and Description');
    }

    createClub(name, description);
    form.reset();
    alert('Club created successfully!');
  });
}

export function suggestBookToClub(clubId, book) {
  const clubs = getClubs();
  const club = clubs.find((c) => c.id === clubId);
  if (!club) return false;

  const suggestion = {
    id: book.id,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors || [],
    thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
    description: book.volumeInfo.description || '',
    votes: 0,
  };

  club.suggestions.push(suggestion);
  saveClubs(clubs);
  return true;
}
