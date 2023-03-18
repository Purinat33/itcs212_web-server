//GAME from DB
const {db} = require('../server/index');
const path = require('path')
const fs = require('fs');

//Search Page
const search = (req,res) =>{
    
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
    // Return 1 specific item
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
                res.render("editGame", { product }); // Pass the user object directly to the EJS template
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
            res.status(200).redirect('/admin/dashboard');
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

  try {
    // Delete product from database
    await db.promise().query('DELETE FROM product WHERE id = ?', [productID]);

    // Delete files with the same prefix as productID from the upload folder
    const directoryPath = path.join(__dirname, '..', 'server', 'public', 'upload');
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

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(401).render('error', { message: 'Product does not exist' });
  }
};


module.exports = {
    search,
    getGame,
    // postGame,
    putGame,
    deleteGame
}