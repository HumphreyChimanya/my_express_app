const express = require(express);
const router = express.router();
const studentController = require('../../controllers/studentcontroller')
const { checkRole } = require('../../middleware/rolecheck')

router.use(checkRole('faculty'));

router.get('/dashboard', facultyController.getDashboard);

router.get('/books/search', facultyController.searchBook);

router.post('/books/reserve/:book_id', facultyController.reserveBook);

router.get('/borrowed', facultyController.getBorrowedBook);

router.get('/profile', facultyController.getProfile);

router.post('/profile/update', facultyController.updateProfile);

module.exports = router;