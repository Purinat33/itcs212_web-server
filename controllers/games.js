//GAME from DB
const {db} = require('../server/index');
const path = require('path')

//GET 
const getGame = (req,res)=>{
    const {id} = req.params;
    console.log(id);
    if(!id){
        //No id supplied, we go with full catalogue
    }
    else{
        //Return 1 specific item
    }
}

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
            
        }
    }catch(err){
        console.log(err);
    }
}

//DELETE
const deleteGame = async (req,res)=>{
    const productID = req.params.id;
    try {
        await db.promise().query('DELETE FROM product WHERE id = ?', [productID]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(401).render('error', {message: "Product does not exist"});
    }
}

module.exports = {
    getGame,
    // postGame,
    putGame,
    deleteGame
}