//For all things admin from add user, delete user, add product, modify product
const {db} = require('./../server/index');
const bcrypt = require('bcrypt');

//Importing games functionality from games controller
const {
    getGame,
    postGame,
    putGame,
    deleteGame
} = require('./games');

const dashboard = async (req,res,next) => {
  const game = 'SELECT * FROM product';
  let product;
  db.query(game, (error, results) => {
    if (error) throw error;
    product = results;

    const query = 'SELECT * FROM users';
    let users;
    db.query(query, (error, results) => {
      if (error) throw error;
      users = results;
      
      // Render admin dashboard page with user data and product data
      res.render('user.ejs', { users: users, product: product });
    });
  });
}


//User section
const createUser = (req,res,next)=>{
    //Post to user DB
    const saltRounds = 10;
    const username = req.body.username.trim();
    const password = req.body.password;
    var isAdmin  = (req.body.role === 'Admin');

    // check if username already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0 || username.toLowerCase() === 'admin') {
      console.log('Username already exists or is invalid');
      return res.status(409).send('Username already exists or is invalid');
    }

    // hash the password with bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }

      // insert new user into the database
      db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', [username, hashedPassword, isAdmin], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        console.log('Registration success');
        res.redirect('/admin/dashboard');
      });
    });
  });
}

const editUser = async (req, res, next) => {
  try {
    if (req.method === "GET") {
      const [rows] = await db
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [req.params.users]);
      if (rows && rows.length) {
        const user = rows[0];
        res.render("edit", { user }); // Pass the user object directly to the EJS template
      } else {
        // User not found, render an error page or redirect
        res.status(404).send("User not found");
      }
    } else if (req.method === "PUT") {
      const newPassword = req.body.password;
      const userId = req.params.users;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const isAdmin = req.body.role === "Admin"; // Retrieve the value of the role radio button and set isAdmin accordingly
      await db
        .promise()
        .query(
          "UPDATE users SET password = ?, isAdmin = ? WHERE id = ?",
          [hashedPassword, isAdmin, userId]
        );
      res.redirect("/admin/dashboard"); // Redirect to the dashboard after the password has been updated
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

//In Node.js, if a DELETE query is executed successfully without any error, the result parameter of the callback function in connection.query() method will contain a affectedRows property that indicates the number of rows deleted. If affectedRows is greater than zero, it means the DELETE query was executed successfully and the specified rows were deleted from the database.
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  // Use the user ID to delete the corresponding user from the database
  try {
    await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {dashboard, createUser, editUser, deleteUser}