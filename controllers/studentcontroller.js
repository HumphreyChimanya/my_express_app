const db = require('../mariadbConfig/databaseConn');

//get student dashboard
exports.getStudentDashboard = (req, res) => {
    const studentId = req.session.userId;

    const sql = 'SELECT * FROM borrowed_books WHERE user_id = ?';

    db.query(sql, [studentId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }

        res.render('view/student/dashboard', { books: result });
    });
};

//borrow book
exports.borrowBook = (req, res) => {
    const { bookId } = req.params;
    const studentId = req.user.id;

    const sql = 'INSERT INTO borrowed_table (user_id, book_id, date_borrowed) VALUES (?, ?, NOW())';
    db.query(sql, [studentId, bookId], (err, result) => {
        if (err) {
            console.log('error borrowing book');
            res.status(500).send('Internal server error');
        }
        const updateBook = 'UPDATE books SET available = 0 WHERE id = ?';
        db.query(updateBook, [bookId], (updateErr) => {
            if (updateErr) {
                console.error('Error updating book status:', updateErr);
                return res.status(500).send('Internal server error');
            }
            res.redirect('/student');
        });
    });
};

//search book
exports.searchBook = (req, res) => {
    const searchTerm = `%${req.query.q}%`;

    const sql = 'SELECT * FROM book_table WHERE title LIKE ? OR author LIKE ? OR category LIKE ?';

    db.query(sql, [searchTerm, searchTerm, searchTerm], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }

        res.render('view/student/dashboard', { books: result });
    });
}

//my borrowed books
exports.getBorrowedBooks = (req, res) => {
    const studentId = req.session.userId;

    const sql = 'SELECT * FROM borrowed_books WHERE user_id = ?';

    db.query(sql, [studentId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }

        res.render('view/student/borrowed_books', { books: result });
    });
};

//return book
exports.returnBook = (req, res) => {
    const { bookId } = req.params;
    const studentId = req.user.id;

    const sql = 'DELETE FROM borrowed_table WHERE user_id = ? AND book_id = ?';
    db.query(sql, [studentId, bookId], (err, result) => {
        if (err) {
            console.log('error returning book');
            res.status(500).send('Internal server error');
        }
        const updateBook = 'UPDATE books SET available = 1 WHERE id = ?';
        db.query(updateBook, [bookId], (updateErr) => {
            if (updateErr) {
                console.error('Error updating book status:', updateErr);
                return res.status(500).send('Internal server error');
            }
            res.redirect('/student/borrowed-books');
        });
    });
};

//user profile
exports.getProfile = (req, res) => {
    const studentId = req.session.userId;

    const sql = 'SELECT * FROM users WHERE id = ?';

    db.query(sql, [studentId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }

        res.render('view/student/profile', { user: result[0] });
    });
};

//