const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {db} = require('./../server/index'); // assuming we have a db.js file that exports the connection to the MySQL database

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
      if (!rows.length) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (!rows.length) {
      return done(null, false);
    }

    const user = rows[0];
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
