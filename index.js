class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


  
//UI class that handles UI Tasks
class UI{
    static displayBooks(){
        // const storedBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'John Doe',
        //         isbn: '3434345'
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'Jesse Lingard',
        //         isbn: '3784345'
        //     }
        // ];
        const books = Store.getBooks();

        books.forEach((book)=>{
            return UI.addBookToList(book);
        })
    }

    static addBookToList(book){
        let row = document.createElement('tr');
        let ul = document.getElementById('book-list')

   
     
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-small delete">X</a></td>
        `
        ul.appendChild(row);

     
       
    }

    //clear fields
    static clearField(){
         document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
    
}

//display books on page load
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//event:add a book
document.getElementById('book-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    title = document.getElementById('title').value
    author = document.getElementById('author').value
    isbn = document.getElementById('isbn').value


         //validate
         if(title === '' || author === '' || isbn === ''){
            document.getElementById('alert').style.display = 'block'

            setTimeout(function(){
                document.getElementById('alert').style.display = 'none'
            },3000)
         }else{

            //instatiate new book
            const book = new Book(title,author,isbn)
            //add new created book to ui
            UI.addBookToList(book)

            //add book to locat storage
            Store.addBook(book);

            //clear all fields
            UI.clearField()

            //success alert
            document.getElementById('success-alert').style.display = 'block'

            setTimeout(function(){
                document.getElementById('success-alert').style.display = 'none'
            },3000)
         }
    
})

//remove book
document.getElementById('book-list').addEventListener('click',function(e){

    if(e.target.classList.contains('delete')){
      e.target.parentElement.parentElement.remove()
    }
    
    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

})

// Store Class: Handles Storage
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  