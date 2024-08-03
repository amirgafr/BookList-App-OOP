const btn_submit = document.querySelector('.btn-primary');
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const table = document.querySelector('table');
const fell = document.getElementById('fell');






class Book {
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    
  }
}


class App{
  #books = [];
  constructor(){
    btn_submit.addEventListener('click',this._addItems.bind(this));
    this._getLocalStorage()
  } 
  _hideForm(){
    title.value = author.value = isbn.value = '';
  }
  _addItems(e){
    e.preventDefault();
    if(!title.value || !author.value || !isbn.value) return this._fellItem()
    const item = new Book(title.value,author.value,isbn.value);
    this.#books.push(item)        
    // hide input 
    this._hideForm();
    this._renderNewItem(item);
    this._setlocalStorage();
    this._deleteBook();
  }
  _renderNewItem(item){
    let html = `
      <tbody>
        <tr>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.isbn}</td>
          <td><a href="#" class="close" data-isbn="${item.isbn}">X</a></td>
        </tr>
      </tbody>
    `
    table.insertAdjacentHTML('beforeend', html);
    // Add click event listener to the "X" link
    const closeLink = table.querySelector(`a[data-isbn="${item.isbn}"]`);
    closeLink.addEventListener('click', (e) => {
      e.preventDefault();
      this._deleteBook(item.isbn);
    });
    
  }
  _fellItem(){
    
    let html = `
        <div class="fell-item">
        Please fill in all fields
      </div>
      `
      fell.insertAdjacentHTML('beforeend',html); 
      setTimeout(function () {fell.removeChild(fell.firstElementChild)}, 3000);
  }
  _setlocalStorage(){
    localStorage.setItem('books',JSON.stringify(this.#books))
  }
  _getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('books'));
    if (!data) return;
    this.#books = data
    this.#books.forEach(work=>{
      this._renderNewItem(work);
    })
  }
  _deleteBook(isbn) {
    // Find the index of the book with the given ISBN
    const index = this.#books.findIndex(book => book.isbn === isbn);
  
    // If the book is found, remove it from the array
    if (index !== -1) {
      this.#books.splice(index, 1);
      this._setlocalStorage();
      this._updateTable();
    }
  }
  _updateTable() {
    // Remove all rows from the table
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
  
    // Render the updated list of books
    this.#books.forEach(book => {
      this._renderNewItem(book);
    });
  }
}




const app = new App()









