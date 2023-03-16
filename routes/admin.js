const express = require('express');
const route = express.Router();
const path = require('path');
const fs = require('fs');
const {
    dashboard, createUser, editUser, deleteUser
} = require('./../controllers/admin');

const {
    getGame,
    // postGame,
    putGame,
    deleteGame
} = require('./../controllers/games')
const multer = require(`multer`); //Used to insert files (especially images)

const {db} = require('./../server/index');

//TODO: Add cookie/JWT checker middleware to each routes




//For generic admin page
route.get('/dashboard', dashboard); 

//USER MANAGEMENT
//For add user page
route.get('/adduser', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'adduser.html'));
})

//For edit user detail page
route.get('/dashboard/edit/:users', editUser); //Getting the user detail page
route.put('/dashboard/edit/:users', editUser); //Same thing but we do the PUT request instead

route.post('/adduser', createUser); //Adding user
route.delete('/dashboard/delete/:id', deleteUser); //The name says it all (the :users is to specify which one to delete);

//PRODUCT MANAGEMENT
//For add product
route.get('/addgame', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'addgame.html'));
})


//Adding game
const upload = multer({ dest: 'server/public/upload', limits:{files:5} });

route.post('/addgame', upload.array('photograph', 5), async (req, res) => {
  const { name, description, singleplayer, multiplayer, open_world, sandbox, simulator, team_based, fps, horror, puzzle, other, publisher, price } = req.body;
  const img = {};

  try {
    const [result] = await db.promise().query('INSERT INTO product SET ?', {
      name,
      description,
      singleplayer: !!singleplayer,
      multiplayer: !!multiplayer,
      open_world: !!open_world,
      sandbox: !!sandbox,
      simulator: !!simulator,
      team_based: !!team_based,
      fps: !!fps,
      horror: !!horror,
      puzzle: !!puzzle,
      other: !!other,
      publisher,
      price,
      img: JSON.stringify(img),
    });

    if (req.files) {
      const files = req.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file.originalname);
        const newName = `${result.insertId}_${i}${ext}`;
        img[`image${i + 1}`] = newName + ext;
        fs.renameSync(file.path, `server/public/upload/${newName}${ext}`);
      }
    }

    // Update the img column in the database with the newly created img object
    await db.promise().query('UPDATE product SET img = ? WHERE id = ?', [JSON.stringify(img), result.insertId]);

    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {message: err});
  }
});


//Edit game
route.get('/dashboard/game/edit/:id', putGame);


//For edit product page
//Admin have the power to CRUD products while users got R
// route.get()

module.exports = route;