//routes to manage the admin functionalities
// Created by: Humphrey Chimanya
// Created on: 23th October 2024

//import the database connection
import db from "../mariadbConfig/databaseConn.js";

//Get the admin dashboard
exports.getDashboard = (req, res) => {
    //Query to get the statistics or data for the admin dashboard
    const sql = 'SELECT COUNT(*) AS bookCount FROM books';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('admin/dashboard', {
                bookCount: result[0].bookCount
            });
        }
    });
};

//Get all books (for managing purposes)
exports.getAllBooks = (req, res) => {
    //Query to get all books
    const sql = 'SELECT * FROM books';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.render('admin/books', {
                books: result
            });
        }
    });
}

//exports the function to render the add book form
exports.getAddBookForm = (req, res) => {
    res.render('admin/add-book');
};
//add a new book
exports.addBook = (req, res) => {
    const {title, author, isbn, published_date, publisher, number_of_pages, book_image} = req.body;

    //SQL query to add a book
    const sql = 'INSERT INTO books (title, author, isbn, published_date, publisher, number_of_pages, book_image) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [title, author, isbn, published_date, publisher, number_of_pages, book_image], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.redirect('/admin/books');
        }
    });
};

//Get the edit book form
exports.getEditBookForm = (req, res) => {
    const bookId = req.params.id;

    //SQL query to get the book to edit
    const sql = 'SELECT * FROM books WHERE id = ?';

    db.query(sql, [bookId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.render('admin/edit-book', {
                book: result[0]
            });
        }
    });
};

//Edit a book
exports.editBook = (req, res) => {
    const bookId = req.params.id;
    const {title, author, isbn, published_date, publisher, number_of_pages, book_image} = req.body;

    //SQL query to edit a book
    const sql = 'UPDATE books SET title = ?, author = ?, isbn = ?, published_date = ?, publisher = ?, number_of_pages = ?, book_image = ? WHERE id = ?';

    db.query(sql, [title, author, isbn, published_date, publisher, number_of_pages, book_image, bookId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.redirect('/admin/books');
        }
    });
};

//Delete a book
exports.deleteBook = (req, res) => {
    const bookId = req.params.id;

    //SQL query to delete a book
    const sql = 'DELETE FROM books WHERE id = ?';

    db.query(sql, [bookId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.redirect('/admin/books');
        }
    });
};

//Get all users (for managing purposes)
exports.getAllUsers = (req, res) => {
    //SQL query to get all users
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.render('admin/users', {
                users: result
            });
        }
    });
};

//Get the edit user form
exports.getEditUserForm = (req, res) => {
    const userId = req.params.id;

    //SQL query to get the user to edit
    const sql = 'SELECT * FROM users WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.render('admin/edit-user', {
                user: result[0]
            });
        }
    });
};

//Edit a user
exports.editUser = (req, res) => {
    const userId = req.params.id;
    const {first_name, last_name, email, password} = req.body;

    //SQL query to edit a user
    const sql = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?';

    db.query(sql, [first_name, last_name, email, password, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.redirect('/admin/users');
        }
    });
};

//add a new user
exports.addUser = (req, res) => {
    const {first_name, last_name, email, password} = req.body;

    //SQL query to add a user
    const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';

    db.query(sql, [first_name, last_name, email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.redirect('/admin/users');
        };
    });
};

//delete user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    //SQL query to delete a user
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.redirect('/admin/users');
        }
    });
};

//Get all borrowed books
exports.getAllBorrowedBooks = (req, res) => {
    //SQL query to get all borrowed books
    const sql = 'SELECT * FROM borrowed_books';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        else {
            res.render('admin/borrowed-books', {
                borrowedBooks: result
            });
        }
    });
};

//view borrowing history
exports.getBorrowingHistory =  (req, res) => {
    const sql = 'SELECT u.name, b.title, br.borrowed_date, br.returned_date FROM borrowed_books br JOIN users u ON br.user_id = u.id JOIN books b ON br.book_id = b.id';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        } else {
            res.render('admin/borrowing-history', {
                borrowingHistory: result
            });
        }
    });
}

//issue book
exports.issueBook = (req, res) => {
    const bookId = req.params.id;
    const userId = req.body.user_id;

    //SQL query to issue a book
    const sql = 'INSERT INTO borrowed_books (user_id, book_id, borrowed_date) VALUES (?, ?, NOW())';

    db.query(sql, [userId, bookId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        } else {
            res.redirect('/admin/books');
        }
    });
}










