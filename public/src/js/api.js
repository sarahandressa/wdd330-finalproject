import { uid } from './utils.js';

const GOOGLE_BOOKS_BASE = 'https://www.googleapis.com/books/v1/volumes';
const OPEN_LIBRARY_BASE = 'https://openlibrary.org/api/books';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

function normalizeGoogleBook(item) {
  const info = item.volumeInfo || {};
  return {
    id: item.id || uid(),
    title: info.title || 'Sem título',
    authors: info.authors || ['Autor desconhecido'],
    description: info.description || '',
    thumbnail: info.imageLinks?.thumbnail || '',
    publishedDate: info.publishedDate || '',
    pageCount: info.pageCount || 0,
    categories: info.categories || [],
    infoLink: info.infoLink || '',
    source: 'google',
  };
}

/**
 * Search books through Google Books API.
 * @param {string} query - search
 * @param {number} maxResults - max. quantity results
 */
export async function googleBooksSearch(query, maxResults = 10) {
  if (!query) return [];

  try {
    const url = new URL(GOOGLE_BOOKS_BASE);
    url.searchParams.set('q', query);
    url.searchParams.set('maxResults', maxResults);
    if (API_KEY) url.searchParams.set('key', API_KEY);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro na busca Google Books: ${res.status}`);
    const data = await res.json();

    return (data.items || []).map(normalizeGoogleBook);
  } catch (err) {
    console.error('googleBooksSearch error:', err);
    return [];
  }
}

export async function searchBooks(query) {
  if (!query) return [];
  const url = `${GOOGLE_BOOKS_BASE}?q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Error fetching books: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('searchBooks error:', error);
    return [];
  }
}

export async function openLibraryByOLID(olid) {
  if (!olid) return null;

  const url = `${OPEN_LIBRARY_BASE}?bibkeys=OLID:${olid}&format=json&jscmd=data`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro na busca Open Library: ${res.status}`);
    const data = await res.json();
    const bookData = data[`OLID:${olid}`];
    if (!bookData) return null;

    return {
      id: olid,
      title: bookData.title || 'Sem título',
      authors: (bookData.authors || []).map((a) => a.name),
      description:
        typeof bookData.description === 'string'
          ? bookData.description
          : bookData.description?.value || '',
      thumbnail: bookData.cover?.medium || '',
      publishedDate: bookData.publish_date || '',
      pageCount: bookData.number_of_pages || 0,
      categories: [],
      infoLink: bookData.url || '',
      source: 'openlibrary',
    };
  } catch (err) {
    console.error('openLibraryByOLID error:', err);
    return null;
  }
}
