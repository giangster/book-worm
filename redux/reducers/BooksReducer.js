const initialState = {
  books: [],
  booksReading: [],
  booksRead: []
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_BOOKS_FROM_SERVER": {
      return {
        ...state,
        books: action.payload,
        booksReading: action.payload.filter(book => !book.read),
        booksRead: action.payload.filter(book => book.read)
      };
    }
    default:
      return state;
  }
};

export default books;
