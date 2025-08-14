const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// Debug: verifica se a chave está sendo carregada
if (!apiKey) {
  console.error(
    '❌ Google Books API key not found! Make sure the .env is correct, starts with VITE_, and o servidor foi reiniciado.',
  );
} else {
  console.log('✅ Google Books API key loaded successfully.');
}

/**
 * Busca livros na API do Google Books
 * @param {string} query - Termo de busca
 * @returns {Promise<Array>} Lista de livros encontrados
 */
export async function searchBooks(query) {
  if (!apiKey) return [];

  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query,
    )}&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Request error: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) return [];

    return data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Title not available',
      authors: item.volumeInfo.authors || ['Unknown author'],
      description: item.volumeInfo.description || 'No description',
      thumbnail:
        item.volumeInfo.imageLinks?.thumbnail ||
        'https://via.placeholder.com/128x192?text=No+Image',
      votes: 0,
      status: 'available',
    }));
  } catch (error) {
    console.error('Error when searching for books:', error);
    return [];
  }
}

/**
 * Busca um livro pelo ID na API do Google Books
 * @param {string} id - ID do livro
 * @returns {Promise<Object|null>} Dados do livro ou null em caso de erro
 */
export async function searchBookById(id) {
  if (!apiKey) {
    console.error('Google Books API key is missing');
    return null;
  }

  try {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error fetching book: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return {
      id: data.id,
      title: data.volumeInfo.title || 'Title not available',
      authors: data.volumeInfo.authors || ['Unknown author'],
      description: data.volumeInfo.description || 'No description',
      thumbnail:
        data.volumeInfo.imageLinks?.thumbnail ||
        'https://via.placeholder.com/128x192?text=No+Image',
      votes: 0,
      status: 'available',
    };
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    return null;
  }
}
