// Import the database connection
const db = require('../db');

// Display the dashboard of the faculty
exports.dashboard = function(req, res) {
    const faculty_id = req.user.id;

    // Query to get the details of the faculty
    db.query('SELECT * FROM faculty WHERE faculty_id = ?', [faculty_id], function(err, faculty) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        // Query to get the details of the courses taught by the faculty
        db.query('SELECT * FROM course WHERE faculty_id = ?', [faculty_id], function(err, courses) {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            // Query to get the details of the students enrolled in the courses taught by the faculty
            db.query('SELECT * FROM student WHERE course_id IN (SELECT course_id FROM course WHERE faculty_id = ?)', [faculty_id], function(err, students) {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Internal Server Error');
                }
                res.render('faculty/dashboard', { faculty: faculty[0], courses: courses, students: students });
            });
        });
    });
};

// Search for book by title, author, or ISBN
exports.search = function(req, res) {
    const search = req.body.search;
    const faculty_id = req.user.id;

    // SQL query to search for books
    const sql = 'SELECT * FROM book WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?';

    db.query(sql, ['%' + search + '%', '%' + search + '%', '%' + search + '%'], function(err, books) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('../view/faculty/searchBook', { books: books });
    });
};

//reserve book
exports.reserveBook = function(req, res) {
    const book_id = req.params.book_id;
    const faculty_id = req.user.id;

    // SQL query to reserve a book
    const sql = 'INSERT INTO reservation (book_id, faculty_id) VALUES (?, ?)';

    db.query(sql, [book_id, faculty_id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/faculty/dashboard');
    });
}

//get reserved books
exports.getReservedBooks = function(req, res) {
    const faculty_id = req.user.id;

    // SQL query to get the reserved books
    const sql = 'SELECT * FROM reservation WHERE faculty_id = ?';

    db.query(sql, [faculty_id], function(err, reservedBooks) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('faculty/reservedBooks', { reservedBooks: reservedBooks });
    });
}

//cancel reservation
exports.cancelReservation = function(req, res) {
    const reservation_id = req.params.reservation_id;

    // SQL query to cancel the reservation
    const sql = 'DELETE FROM reservation WHERE reservation_id = ?';

    db.query(sql, [reservation_id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/faculty/reservedBooks');
    });
}

//get students
exports.getStudents = function(req, res) {
    const faculty_id = req.user.id;

    // SQL query to get the students enrolled in the courses taught by the faculty
    const sql = 'SELECT * FROM student WHERE course_id IN (SELECT course_id FROM course WHERE faculty_id = ?)';

    db.query(sql, [faculty_id], function(err, students) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('faculty/students', { students: students });
    });
}

//get profile
exports.getProfile = function(req, res) {
    const faculty_id = req.user.id;

    // SQL query to get the details of the faculty
    const sql = 'SELECT * FROM faculty WHERE faculty_id = ?';

    db.query(sql, [faculty_id], function (err, faculty) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('faculty/profile', {faculty: faculty[0]});
    });
}

//borrowed books
exports.getBorrowedBooks = function(req, res) {
    const faculty_id = req.user.id;

    // SQL query to get the borrowed books
    const sql = 'SELECT * FROM borrowed_books WHERE faculty_id = ?';

    db.query(sql, [faculty_id], function(err, borrowedBooks) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('faculty/borrowedBooks', { borrowedBooks: borrowedBooks });
    });
};
