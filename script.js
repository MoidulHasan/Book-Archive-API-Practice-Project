//Function to take input and search from url
const searchBook = () => {
    //display result div when function called
    document.getElementById("result").classList.remove("d-none");
    //Spinner
    const spinner = `<div class="spinner-border" role="status"></div>`;
    showMessage(spinner);
    //take input from input field
    document.getElementById("bookRow").innerHTML ='';
    const text = document.getElementById("text").value;
    if (text == '') {
        showMessage("Type Book Name To Search");
    }
    else {
        
        document.getElementById("text").value = '';
        const url = `https://openlibrary.org/search.json?q=${text}`;
        // fetch data from url
        fetch(url)
            .then(res => res.json())
            .then(data => showBook(data))
            .catch(error => showMessage(error))
    }
}
// function to show message
const showMessage = (Message) => {
    document.getElementById("message").innerHTML = `<h3 class="text-white fw-bold py-2">${Message}</h3>`;
};

// function to display books
const showBook = booklist => {
    books = booklist.docs;
    if (books.length == 0) {
        showMessage("No Book Found!");
    }
    else {
        const lengthMessage = `${books.length} Books Found!`
        showMessage(lengthMessage);
        //Show all Books
        books.forEach(book => {
            const bookitm = `
            <div class="col-6 col-md-3 my-2">
                <div class="card h-100 ">
                    <img height="320px" src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 10909258}-M.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <ul class="card-text my-2">
                            <li>Author: <span class="fw-bolder"> ${book.author_name ? book.author_name : 'Author Name Not Found'} </span></li>
                            <li>Publisher: ${book.publisher ? book.publisher[0] : 'Publisher Not Found'}</li >
                            <li>1st Publish Year: ${book.first_publish_year ? book.first_publish_year : 'First Publish Year Not Found'}</li>
                        </ul >
                    </div >
                </div > 
            </div>`;

            //show book item
            const bookRow = document.getElementById("bookRow");
            bookRow.innerHTML = bookRow.innerHTML + bookitm;
        });
    }
}