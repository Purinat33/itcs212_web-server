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


    return res.status(200).json({ product: products });
    
}

const getGame = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    // No id supplied, we go with full catalogue
    const [rows] = await db.promise().query(`
      SELECT id, name, price, description, publisher,
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
        const { id, name, price, description, publisher, ...genres } = row;
        const filteredGenres = Object.entries(genres)
            .filter(([key, value]) => value !== null)
            .map(([key]) => key);
        return {
            id,
            name,
            price,
            description,
            publisher,
            genres: filteredGenres
        };
    });

    return res.status(200).json(products);
  } else {
    // Fetch the product details from the database
    const [rows] = await db.promise().query(`
      SELECT id, name, price, description, publisher,
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
      return res.status(404).json({ message: 'Product not found' });
    }

    // Extract the product details from the query result
    const { name, price, description, publisher, ...genres } = rows[0];
    const filteredGenres = Object.entries(genres)
      .filter(([key, value]) => value !== null && key !== 'id')
      .map(([key]) => key);

    const product = {
      id,
      name,
      price,
      description,
      publisher,
      genres: filteredGenres || []
    };

    res.status(200).json(product);
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
                res.status(200).json({ product }); // Pass the user object directly to the EJS template
            } else {
            // Product not found, render an error page or redirect
            res.status(404).json({message: "Product not found"});
            }
        }else if(req.method === 'PUT'){
            const id = req.params.id;
            const {name, description, singleplayer, multiplayer, open_world, sandbox, simulator, team_based, fps, horror, puzzle, other, publisher, price } = req.body;

            try {
            await db.promise().query(
                `UPDATE product SET name=?, description=?, singleplayer=?, multiplayer=?, open_world=?, sandbox=?, simulator=?, team_based=?, fps=?, horror=?, puzzle=?, other=?, publisher=?, price=? WHERE id=?`,
                [name, description, !!singleplayer, !!multiplayer, !!open_world, !!sandbox, !!simulator, !!team_based, !!fps, !!horror, !!puzzle, !!other, publisher, price, id]
            );
            res.status(200).json({message: 'Product successfully updated', token: req.cookies.token});
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            } 
        }
    }catch(err){
        console.log(err);           
        return res.status(500).json({message: err});
    }
}

const deleteGame = async (req, res) => {
  const productID = req.params.id;
  try {
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
      await db.promise().query('COMMIT');
      res.status(200).json({ message: 'Product deleted successfully', token: req.cookies.token });
    } catch (error) {
      await db.promise().query('ROLLBACK');
      res.status(404).json({ message: 'Product does not exist' });
    }
  } catch (err) {
    await db.promise().query('ROLLBACK');
    res.status(500).json({ message: 'Internal server error' });
  }
};


const postGame = async (req, res) => {
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

    // Update the img column in the database with the newly created img object
    await db.promise().query('UPDATE product SET img = ? WHERE id = ?', [JSON.stringify(img), result.insertId]);

    res.status(201).json({message: 'Product created successfully', token: req.cookies.token})
  } catch (err) {
    console.error(err);
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      // handle unexpected file error
      return res.status(400).json({ message: 'Only up to 5 files can be uploaded with the field name "photograph"' });
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(500).json({ message: 'You can only upload up to 5 files at once.' });
    }
    console.log('Error caught!');
    return res.status(500).json({ message: 'An unexpected error occurred'});
  }
}


module.exports = {
    search,
    getGame,
    postGame,
    putGame,
    deleteGame
}