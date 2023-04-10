class myError extends Error {
  constructor(message) {
    return super(message);
  }
}

const libraryStore = [];

String.prototype.capitalize = function() {
  return this.length === 0 ? '' : this[0].toUpperCase() + this.slice(1)
}

const capitalize = (x) => {
  return x.length === 0 ? '' : x[0].toUpperCase() + x.slice(1)
}

console.log(capitalize('alice')) // 'Alice'
console.log(capitalize('')) // ''

function capitalizeSentence(s) {
  let aux = s.split(" ");
  for (let i = 0; i < aux.length; i++) {
    aux[i] = capitalize(aux[i]);
  }
  let res = aux.join(" ");
  return res;
}

console.log(capitalizeSentence('alice')) // 'Alice'
console.log(capitalizeSentence('alice in Wonderland')) // 'Alice In Wonderland'
console.log("------------------------------");


class Media {
  //private fields
  #title;
  #ratings;
  #available;

  constructor({ title: mediaTitle }) {
    if (mediaTitle === undefined) {
      throw new myError("Missing argument!");
    }
    if (typeof mediaTitle !== "string") {
      throw new myError("Title has to be a string!");
    }
    this.#title = capitalizeSentence(mediaTitle);
    //rating and available field get default values
    this.#ratings = [];
    this.#available = true;
  }

  //some getters
  get title() {
    return this.#title;
  }

  get ratings() {
    return this.#ratings;
  }

  get available() {
    return this.#available;
  }

  addRating(rating) {
    this.#ratings.push(rating);
  }

  orderMedia() {
    return new Promise(function (resolve, reject) {
      if (this.available) {
        setTimeout( () => {
          this.#available = false;
          resolve();
        }, 1000)
        return;
      }

      reject("Not available")
    })
  }

  returnMedia() {
    return new Promise(function (resolve, reject) {
      if (!this.available) {
        setTimeout(() => {
          this.#available = true;
          resolve();
        }, 1000)
        return;
      }

      reject("Already returned")
    })
  }
}

/*
const media = new Media({title: 'alice in wonderland'})
console.log(media.title) // 'Alice In Wonderland'
console.log(media.ratings) // []
console.log(media.available) // true

media.addRating(9)
media.addRating(8.5)
console.log(media.ratings) // [9, 8.5]

media.title = "not alice"
media.ratings = [1, 1]
media.available = false
console.log(media.title) // 'Alice In Wonderland'
console.log(media.ratings) // [9, 8.5]
console.log(media.available) // true

console.log("------------------------------");

*/


const media = new Media({title: 'alice in wonderland'})

await media.orderMedia()
console.log(media.available) // false

await media.returnMedia()
console.log(media.available) // true


class Book extends Media {
  #author;
  #pages;
  constructor({ title: bookTitle, author: bookAuthor, pages: bookPages }) {
    if (bookAuthor === undefined || bookPages === undefined) {
      throw new myError("Missing argument!");
    }
    if (typeof bookAuthor !== "string") {
      throw new myError("Author has to be a string!");
    }
    if (typeof bookPages !== "number" || bookPages < 0) {
      throw new myError("Pages has to be a positive number!");
    }
    //using super to call the parent-class constructor
    super({ title: bookTitle });
    this.#author = capitalizeSentence(bookAuthor);
    this.#pages = bookPages;
  }

  //some more getters
  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  orderBook() {
    return super.orderMedia();

  }

  returnBook() {
    return super.returnMedia();
  }
}

/*
const book = new Book({
  title: "alice's adventures in wonderland",
  author: 'lewis carroll',
  pages: 136
})

console.log(book.title) // "Alice's Adventures In Wonderland"
console.log(book.ratings) // []
console.log(book.available) // true
console.log(book.author) // 'Lewis Carroll'
console.log(book.pages) // 136

book.addRating(9)
book.addRating(8.5)
console.log(book.ratings) // [9, 8.5]

book.title = "not alice"
book.ratings = [1, 1]
book.available = false
book.author = "Charles Dickens"
book.pages = 500
console.log(book.title) // "Alice's Adventures In Wonderland"
console.log(book.ratings) // [9, 8.5]
console.log(book.available) // true
console.log(book.author) // 'Lewis Carroll'
console.log(book.pages) // 136
console.log("------------------------------")
*/

class Movie extends Media {
  #director;
  #length;
  constructor({ title: movieTitle, director: movieDirector, length: movieLength }) {
    if (movieDirector === undefined || movieLength === undefined) {
      throw new myError("Missing argument!");
    }
    if (typeof movieDirector !== "string") {
      throw new myError("Director has to be a string!");
    }
    if (typeof movieLength !== "number" || movieLength < 0) {
      throw new myError("Length has to be a number!");
    }
    super({ title: movieTitle });
    this.#director = capitalizeSentence(movieDirector);
    this.#length = movieLength;
  }

  //even more getters
  get director() {
    return this.#director;
  }

  get length() {
    return this.#length;
  }

  orderBook() {
    return super.orderMedia();

  }

  returnBook() {
    return super.returnMedia();
  }
}

/*
const movie = new Movie({
  title: "alice in wonderland",
  director: 'tim burton',
  length: 108
})

console.log(movie.title) // 'Alice In Wonderland'
console.log(movie.ratings) // []
console.log(movie.available) // true
console.log(movie.director) // 'Tim Burton'
console.log(movie.length) // 108

movie.addRating(9)
movie.addRating(8.5)
console.log(movie.ratings) // [9, 8.5]

movie.title = "not alice"
movie.ratings = [1, 1]
movie.available = false
movie.director = "Tommy Wiseau"
movie.length = 500
console.log(movie.title) // 'Alice In Wonderland'
console.log(movie.ratings) // [9, 8.5]
console.log(movie.available) // true
console.log(movie.director) // 'Tim Burton'
console.log(movie.length) // 108
*/

const addToLibrary = (props) => {
  try {
    switch (props.type) {
      case "book":
        {
          const media = new Book(props)
          libraryStore.push(media)
          return media;
        }
      case "movie":
        {
          const media = new Movie(props)
          libraryStore.push(media)
          return media;
        }
      default:
        {
          const media = new Media(props);
          libraryStore.push(media)
          return media;
        }
    }
  } catch (e) {
    if (e instanceof myError) {
      console.log(e);
      return undefined;
    }
  }
}

//AddToLibrary but getting list of arguments
function bulkAddToLibrary(list) {
  let res = [];
  for (const i of list) {
    res.push(addToLibrary(i));
  }
  return res;
}

/*
const book = addToLibrary({
  type: 'book',
  title: "alice's adventures in wonderland",
  author: 'lewis carroll',
  pages: 136
})

const movie = addToLibrary({
  type: 'movie',
  title: "alice in wonderland",
  director: 'tim burton',
  length: 108
})

const media = addToLibrary({
  title: 'Media'
})

console.log("library store:");
console.log(libraryStore);


console.log(book.title, book.author, book.pages);
console.log(movie.title, movie.director, movie.length);
console.log(media.title, media.ratings, media.available);
*/
/*
[ Book { _title: 'Alice\'s Adventures In Wonderland',
    _ratings: [],
    _available: true,
    _author: 'Lewis Carroll',
    _pages: 136 
  },
  Movie { _title: 'Alice In Wonderland',
    _ratings: [],
    _available: true,
    _director: 'Tim Burton',
    _length: 108 
  },
  Media { _title: 'Media', _ratings: [], _available: true }
]
*/

/*
function order(title) {
  for (let i = 0; i < libraryStore.length; i++) {
    if (libraryStore[i].title === title) {
      libraryStore[i].orderMedia().then(
        console.log("Order completed!")
      ).catch((e) => {
        console.log("Sorry! " + e)
      })
    }
  }
}
*/





const book1 = addToLibrary({
  type: 'book',
  author: 'lewis carroll',
  pages: 136
}) // Wrong title
const book2 = addToLibrary({
  type: 'book',
  title: "alice's adventures in wonderland",
  pages: 136
}) // Wrong author
const book3 = addToLibrary({
  type: 'book',
  title: "alice's adventures in wonderland",
  author: 'lewis carroll',
}) // Wrong pages
const book4 = addToLibrary({
  type: 'book',
  title: "alice's adventures in wonderland",
  author: 'lewis carroll',
  pages: -10
}) // Wrong pages
const movie1 = addToLibrary({
  type: 'movie',
  director: 'tim burton',
  length: 108
}) // Wrong title
const movie2 = addToLibrary({
  type: 'movie',
  title: "alice in wonderland",
  length: 108
}) // Wrong director
const movie3 = addToLibrary({
  type: 'movie',
  title: "alice in wonderland",
  director: 'tim burton',
}) // Wrong length
const movie4 = addToLibrary({
  type: 'movie',
  title: "alice in wonderland",
  director: 'tim burton',
  length: -10
}) // Wrong length
const media2 = addToLibrary({
  title: 123
}) // Wrong title