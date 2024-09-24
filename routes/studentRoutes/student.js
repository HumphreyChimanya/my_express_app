const express = require(express);
const router = express.router();
const studentController = require('../../controllers/studentcontroller')
const { checkRole } = require('../../middleware/rolecheck')

router.use(checkRole('student'));

router.get('/dashboard', studentController.getDashboard);

router.get('/books/search', studentController.searchBook);

router.post('/books/borrow/:book_id', studentController.borrowBook);

router.get('/borrowed', studentController.getBorrowedBook);

router.get('/profile', studentController.getProfile);

router.post('/profile/update', studentController.updateProfile);

module.exports = router;