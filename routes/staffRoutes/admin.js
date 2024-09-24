//import 
const express = require(express);
const router = express.router();
const studentController = require('../../controllers/studentcontroller')
const { checkRole } = require('../../middleware/rolecheck')

router.use(checkRole('admin'));

router.get('/dashboard', adminController.getDashboard);

//routes to manage books
router.get('/books', adminController.getAllBooks);
router.post('/books/add', adminController.addBook);
router.post('/books/update/:book_id', adminController.editBook);
router.delete('/books/delete/:book_id', adminController.deleteBook);

//routes to manage the borrowing and returning books
router.post('/books/issue/:book_id', adminController.issueBook);
router.post('/books/return/:book_id' , adminController.returnBook);

//routes to manage the users of the system
router.get('/users', adminController.getAllUsers);
router.post('/users/add', adminController.addUser);
router.post('/users/update/:user_id', adminController.editUser);
router.delete('/users/delete/:user_id', adminController.deleteUser);

//To view the transactions of borrowing and returning books
router.get('/borrowed/history', adminController.getBorrowingHistory)

module.exports = router;