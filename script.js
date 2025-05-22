// Filtering functionality for the Book Recommendations page
document.addEventListener('DOMContentLoaded', function() {
  // Get filter dropdowns and book list items
  var genreFilter = document.getElementById('genreFilter');
  var ratingFilter = document.getElementById('ratingFilter');
  var bookList = document.getElementById('book-list');
  if (!genreFilter || !ratingFilter || !bookList) {
    // If elements are not found, likely not on the Book Recs page; exit
    return;
  }
  
  // Attach event listeners to filters
  genreFilter.addEventListener('change', filterBooks);
  ratingFilter.addEventListener('change', filterBooks);
  
  function filterBooks() {
    var selectedGenre = genreFilter.value;
    var selectedRating = ratingFilter.value;
    // Loop through all book list items
    var books = bookList.getElementsByTagName('li');
    for (var i = 0; i < books.length; i++) {
      var book = books[i];
      var bookGenre = book.getAttribute('data-genre');
      var bookRating = parseInt(book.getAttribute('data-rating'), 10);
      // Determine if this book should be visible based on filters
      var genreMatch = (selectedGenre === 'all' || bookGenre === selectedGenre);
      var ratingMatch = (selectedRating === 'all' || bookRating >= parseInt(selectedRating, 10));
      if (genreMatch && ratingMatch) {
        book.style.display = 'list-item'; // show item
      } else {
        book.style.display = 'none'; // hide item
      }
    }
  }
});
