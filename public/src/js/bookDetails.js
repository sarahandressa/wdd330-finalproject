import { searchBookById } from './api.js';

function getBookIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderBookDetails(book) {
  document.getElementById('book-title').textContent =
    book.volumeInfo.title || 'Untitled';
  document.getElementById('book-author').textContent =
    book.volumeInfo.authors?.join(', ') || 'Unknown';
  document.getElementById('book-cover').src =
    book.volumeInfo.imageLinks?.thumbnail || '/images/no-cover.png';
  document.getElementById('book-description').textContent =
    book.volumeInfo.description || 'No description available.';
}

function saveProgress(status) {
  const bookId = getBookIdFromURL();
  let progress = JSON.parse(localStorage.getItem('readingProgress')) || {};
  progress[bookId] = status;
  localStorage.setItem('readingProgress', JSON.stringify(progress));
  alert(`Book marked as ${status}`);
}

function addToTimeline() {
  const bookId = getBookIdFromURL();
  let timeline = JSON.parse(localStorage.getItem('timeline')) || [];
  if (!timeline.includes(bookId)) {
    timeline.push(bookId);
    localStorage.setItem('timeline', JSON.stringify(timeline));
    alert('Book added to timeline!');
  } else {
    alert('This book is already in your timeline.');
  }
}

function renderComments() {
  const bookId = getBookIdFromURL();
  const comments = JSON.parse(localStorage.getItem(`comments_${bookId}`)) || [];
  const board = document.getElementById('discussionBoard');
  board.innerHTML = '';
  comments.forEach((c) => {
    const div = document.createElement('div');
    div.classList.add('comment');
    div.innerHTML = `<strong>${c.user}:</strong> ${c.text}`;
    board.appendChild(div);
  });
}

function handleCommentSubmit(e) {
  e.preventDefault();
  const textarea = e.target.querySelector('textarea');
  const text = textarea.value.trim();
  if (!text) return;

  const bookId = getBookIdFromURL();
  const comments = JSON.parse(localStorage.getItem(`comments_${bookId}`)) || [];
  comments.push({ user: 'Anonymous', text });
  localStorage.setItem(`comments_${bookId}`, JSON.stringify(comments));
  textarea.value = '';
  renderComments();
}

async function init() {
  const bookId = getBookIdFromURL();
  if (!bookId) {
    alert('No book ID provided.');
    return;
  }

  try {
    const book = await searchBookById(bookId);
    renderBookDetails(book);
  } catch (err) {
    console.error('Error loading book:', err);
  }

  // Button events
  document
    .getElementById('markReading')
    .addEventListener('click', () => saveProgress('reading'));
  document
    .getElementById('markFinished')
    .addEventListener('click', () => saveProgress('finished'));
  document
    .getElementById('addTimeline')
    .addEventListener('click', addToTimeline);

  // Comments
  document
    .getElementById('commentForm')
    .addEventListener('submit', handleCommentSubmit);
  renderComments();
}

init();
