import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title.trim() && newBook.author.trim()) {
      const book = {
        id: Date.now(),
        title: newBook.title,
        author: newBook.author
      };
      setBooks([...books, book]);
      setNewBook({ title: '', author: '' });
    }
  };

  // Handle removing a book
  const handleRemoveBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Management System</h1>
      </header>

      <div className="container">
        {/* Search Section */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add Book Form */}
        <div className="add-book-section">
          <h2>Add New Book</h2>
          <form onSubmit={handleAddBook} className="add-book-form">
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="form-input"
            />
            <button type="submit" className="add-button">Add Book</button>
          </form>
        </div>

        {/* Books List */}
        <div className="books-section">
          <h2>Books Collection</h2>
          {filteredBooks.length === 0 ? (
            <p className="no-books">No books found.</p>
          ) : (
            <ul className="books-list">
              {filteredBooks.map(book => (
                <li key={book.id} className="book-item">
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>by {book.author}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
