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
});

const upload = multer({ dest: 'server/public/upload', limits:{files:5} });

route.post('/addgame', upload.array('photograph', 5), async (req, res) => {
  // Check if exactly 5 files have been uploaded
  if (req.files && req.files.length !== 5) {
    return res.status(400).render('error', { message: 'Please upload exactly 5 images' });
  }

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

    // Copy and rename the uploaded files
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      // const ext = path.extname(file.originalname).replace();
      // const newName = `${result.insertId}_${i}${ext}`;
      const ext = path.extname(file.originalname).toLowerCase();
      const newName = `${result.insertId}_${i}${ext === '.jpeg' ? '.jpg' : ext}`;
      img[`image${i + 1}`] = newName;
      fs.renameSync(file.path, `server/public/upload/${newName}`);
    }

    // Update the img column in the database with the newly created img object
    await db.promise().query('UPDATE product SET img = ? WHERE id = ?', [JSON.stringify(img), result.insertId]);

    //Delete unwanted files

    const folderPath = path.join(__dirname,'..','server', 'public', 'upload');

    fs.readdir(folderPath, async (err, files) => {
      if (err) throw err;

      // Retrieve the IDs of all products in the database
      const [rows] = await db.promise().query('SELECT id FROM product');
      const productIds = rows.map((row) => row.id);

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);

        // Check if the file doesn't have an extension or doesn't start with "digits_"
        if (
          file !== 'placeholder.jpg' &&
          (!path.extname(file) || !file.match(/^\d+_.*$/))
        ) {
          fs.unlink(filePath, (err) => {
            if (err) throw err;

            console.log(`Deleted file: ${filePath}`);
          });
        } else {
          // Check if the file is associated with an existing product
          const id = parseInt(file.split('_')[0]);
          if (!productIds.includes(id)) {
            fs.unlink(filePath, (err) => {
              if (err) throw err;

              console.log(`Deleted file: ${filePath}`);
            });
          }
        }
      });
    });

    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    try {
      // Delete all files that were uploaded but not processed properly
      const filesToDelete = req.files.map((file) => file.path);
      if (filesToDelete.length > 0) {
        for (let i = 0; i < filesToDelete.length; i++) {
          fs.unlinkSync(filesToDelete[i]);
        }
      }
    } catch (error) {
      console.error(error);
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      // handle unexpected file error
      return res.status(400).render('error', { message: 'Only up to 5 files can be uploaded with the field name "photograph"' });
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(500).render('error', { message: 'You can only upload up to 5 files at once.' });
    }
    console.log('Error caught!');
    return res.status(500).render('error', { message: 'An unexpected error occurred'});
  }
});



//Edit game
route.get('/dashboard/game/edit/:id', putGame);
route.put('/dashboard/game/edit/:id', putGame);
route.delete('/dashboard/game/delete/:id', deleteGame);

//For edit product page
//Admin have the power to CRUD products while users got R
// route.get()

module.exports = route;