const express = require('express');
const cors = require('cors');
const studentRoutes = require('../routes/studentRoutes/student.js');
const facultyRoutes = require('../routes/facultyRoutes/faculty.js');
const staffRoutes = require('../routes/staffRoutes/admin.js');
const db = require('../mariadbConfig/databaseConn.js'); // Assuming you have a database connection module

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to check the database connection
const checkDatabaseConnection = async () => {
    try {
        await db.getConnection();
        console.log('Connected to MariaDB');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
};

// Define routes
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/staff', staffRoutes);

// Check the database connection before starting the server
checkDatabaseConnection().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
});

