//GAME from DB
const {db} = require('../index');
const path = require('path')
const fs = require('fs');
const multer = require('multer')

//Search Page
const search = async (req,res) =>{
    const [rows] = await db.promise().query(`
      SELECT id, name, price, description, publisher, img,
        IF(singleplayer, 'Singleplayer', NULL) AS singleplayer,
        IF(multiplayer, 'Multiplayer', NULL) AS multiplayer,
        IF(open_world, 'Open World', NULL) AS open_world,
        IF(sandbox, 'Sandbox', NULL) AS sandbox,
        IF(simulator, 'Simulator', NULL) AS simulator,
        IF(team_based, 'Team-based', NULL) AS team_based,
        IF(fps, 'FPS', NULL) AS fps,
        IF(horror, 'Horror', NULL) AS horror,
        IF(puzzle, 'Puzzle', NULL) AS puzzle,
        IF(other, 'Other', NULL) AS other
      FROM product
    `);

    const products = rows.map(row => {
        const { id, name, price, description, publisher, img, ...genres } = row;
        const filteredGenres = Object.entries(genres)
            .filter(([key, value]) => value !== null)
            .map(([key]) => key);
        return {
            id,
            name,
            price,
            description,
            publisher,
            img,
            genres: filteredGenres
        };
    });


    return res.status(200).render('search', { product: products });
    
}

const getGame = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    // No id supplied, we go with full catalogue
    const [rows] = await db.promise().query(`
      SELECT id, name, price, description, publisher, img,
        IF(singleplayer, 'Singleplayer', NULL) AS singleplayer,
        IF(multiplayer, 'Multiplayer', NULL) AS multiplayer,
        IF(open_world, 'Open World', NULL) AS open_world,
        IF(sandbox, 'Sandbox', NULL) AS sandbox,
        IF(simulator, 'Simulator', NULL) AS simulator,
        IF(team_based, 'Team-based', NULL) AS team_based,
        IF(fps, 'FPS', NULL) AS fps,
        IF(horror, 'Horror', NULL) AS horror,
        IF(puzzle, 'Puzzle', NULL) AS puzzle,
        IF(other, 'Other', NULL) AS other
      FROM product
    `);

    const products = rows.map(row => {
        const { id, name, price, description, publisher, img, ...genres } = row;
        const filteredGenres = Object.entries(genres)
            .filter(([key, value]) => value !== null)
            .map(([key]) => key);
        return {
            id,
            name,
            price,
            description,
            publisher,
            img,
            genres: filteredGenres
        };
    });


    return res.status(200).render('catalogue', { product: products });
  } else {
    const id = req.params.id;
    // Fetch the product details from the database
  const [rows] = await db.promise().query(`
    SELECT id, name, price, description, publisher, img,
      IF(singleplayer, 'Singleplayer', NULL) AS singleplayer,
      IF(multiplayer, 'Multiplayer', NULL) AS multiplayer,
      IF(open_world, 'Open World', NULL) AS open_world,
      IF(sandbox, 'Sandbox', NULL) AS sandbox,
      IF(simulator, 'Simulator', NULL) AS simulator,
      IF(team_based, 'Team-based', NULL) AS team_based,
      IF(fps, 'FPS', NULL) AS fps,
      IF(horror, 'Horror', NULL) AS horror,
      IF(puzzle, 'Puzzle', NULL) AS puzzle,
      IF(other, 'Other', NULL) AS other
    FROM product
    WHERE id = ?
  `, [id]);

  // If the product with the given ID doesn't exist, return a 404 error
  if (rows.length === 0) {
    return res.status(404).render('error', { message: 'Product not found' });
  }

  // Extract the product details from the query result
  const { name, price, description, publisher, img, ...genres } = rows[0];
  const filteredGenres = Object.entries(genres)
    .filter(([key, value]) => value !== null && key !== 'id')
    .map(([key]) => key);

    // Get the image filenames for the product
  const imageFilenames = [];
    for (let i = 1; i <= 4; i++) {
      const filename = `${id}_${i}.jpg`;
      const imagePath = path.join(__dirname, '../../frontend/public/upload', filename);
      if (fs.existsSync(imagePath)) {
        imageFilenames.push(filename);
      }
  }

  const product = {
    id,
    name,
    price,
    description,
    publisher,
    img,
    genres: filteredGenres,
    images: imageFilenames

  };

  // Render the product page EJS template, passing the product data to it
  res.status(200).render('product', { product });
  }
};


//PUT
const putGame = async (req,res)=>{
    //Serve edit page
    try {
        if(req.method==='GET'){
            const [rows] = await db
            .promise()
            .query("SELECT * FROM product WHERE id = ?", [req.params.id]);
            if (rows && rows.length) {
                const product = rows[0];
                res.status(200).render("editGame", { product }); // Pass the user object directly to the EJS template
            } else {
            // Product not found, render an error page or redirect
            res.status(404).render('error', {message: "Product not found"});
            }
        }else if(req.method === 'PUT'){
            const id = req.params.id;
            const {name, description, singleplayer, multiplayer, open_world, sandbox, simulator, team_based, fps, horror, puzzle, other, publisher, price } = req.body;

            try {
            await db.promise().query(
                `UPDATE product SET name=?, description=?, singleplayer=?, multiplayer=?, open_world=?, sandbox=?, simulator=?, team_based=?, fps=?, horror=?, puzzle=?, other=?, publisher=?, price=? WHERE id=?`,
                [name, description, !!singleplayer, !!multiplayer, !!open_world, !!sandbox, !!simulator, !!team_based, !!fps, !!horror, !!puzzle, !!other, publisher, price, id]
            );
            res.status(200).render('success',{message: 'Product successfully updated', token: req.cookies.token});
            } catch (error) {
                console.log(error);
                return res.status(500).render('error', { message: error });
            } 
        }
    }catch(err){
        console.log(err);           
        return res.status(500).render('error', {message: err});
    }
}

const deleteGame = async (req, res) => {
  const productID = req.params.id;
  try{
    //Delete all product reference in the cart as well
    await db.promise().query('START TRANSACTION');
    try {
      await db.promise().query('DELETE FROM cart where pid = ?', [productID]);
      console.log(`Deleted from cart where pid = ${productID}`);
    } catch (error) {
      await db.promise().query('ROLLBACK');
    }
    try {
      // Delete product from database
      await db.promise().query('DELETE FROM product WHERE id = ?', [productID]);

      // Delete files with the same prefix as productID from the upload folder
      const directoryPath = path.join(__dirname, '..','..' , 'frontend', 'public', 'upload');
      fs.readdir(directoryPath, (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
          if (file.startsWith(productID + '_')) {
            fs.unlink(path.join(directoryPath, file), (err) => {
              if (err) throw err;
              console.log(`Deleted ${file}`);
            });
          }
        });
      });
      await db.promise().query('COMMIT');
      res.status(200).render('success', { message: 'Product deleted successfully', token: req.cookies.token });
    } catch (error) {
      await db.promise().query('ROLLBACK');
      res.status(404).render('error', { message: 'Product does not exist' });
    }
  }catch(err){
    await db.promise().query('ROLLBACK');
    res.status(500).render('error', { message: 'Internal server error'});
  }
};

const upload = multer({ dest: '../frontend/public/upload', limits:{files:5} });

const postGame = async (req, res) => {
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
      fs.renameSync(file.path, `../frontend/public/upload/${newName}`);
    }

    // Update the img column in the database with the newly created img object
    await db.promise().query('UPDATE product SET img = ? WHERE id = ?', [JSON.stringify(img), result.insertId]);

    //Delete unwanted files

    const folderPath = path.join(__dirname,'..','..','frontend', 'public', 'upload');
    console.log(folderPath);

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

    res.status(201).render('success', {message: 'Product created successfully', token: req.cookies.token})
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
}

module.exports = {
    search,
    getGame,
    postGame,
    putGame,
    deleteGame,
    upload
}