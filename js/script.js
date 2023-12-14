// localStorage.removeItem("myList");

function validateForm() {
  var formName = document.getElementById('form-name').value;
  var formAuthor = document.getElementById('form-author').value;
  var formPublishing = document.getElementById('form-publishing').value;
  var formIsbn = document.getElementById('form-isbn').value;

  if (formName === '' || formAuthor === '' || formPublishing === '' || formIsbn === '') {
    alert('Por favor, complete todos los campos.');
    return false;
  }

  addBook(formName, formAuthor, formPublishing, formIsbn);

  alert('¡Libro añadido con éxito!');
  return true;
}

function addBook(formName, formAuthor, formPublishing, formIsbn) {

  var myList;

  if (localStorage.getItem("myList")) {
    myList = JSON.parse(localStorage.getItem("myList"));
  } else {
    myList = {
      books: [],
    };
  }

  const newElement = {
    "name": formName,
    "author": formAuthor,
    "isbn": formIsbn,
    "publishing": formPublishing
  };

  myList['books'].push(newElement)

  localStorage.setItem("myList", JSON.stringify(myList));
  showBook();

}

function deleteBook(isbn) {

  var myList = JSON.parse(localStorage.getItem("myList"));
  var data = myList['books'];

  let nuevoArray = data.filter(elemento => elemento.isbn !== isbn)

  myList['books'] = nuevoArray;

  localStorage.setItem("myList", JSON.stringify(myList));
  showBook();
}

function editBook(isbn) {
  console.log(isbn)
}

function showBook() {
  var myList;

  if (localStorage.getItem("myList")) {
    myList = JSON.parse(localStorage.getItem("myList"));
  } else {
    myList = {
      books: [],
    };
  }

  var data = myList['books'];

  var root = document.getElementById('root');
  var htmlAccumulator = '';

  data.forEach(element => {
    const htmlString = `<tr><td>${element.name}</td><td>${element.author}</td><td>${element.isbn}</td><td>${element.publishing}</td> <td> <button type="button" onclick="deleteBook('${element.isbn}')">Eliminar</button> <button type="button" onclick="editBook('${element.isbn}')">Editar</button> </td></tr>`;
    htmlAccumulator += htmlString;
  });

  root.innerHTML = htmlAccumulator;
}

document.addEventListener("DOMContentLoaded", (event) => {
  showBook();
});

