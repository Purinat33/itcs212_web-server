//GAME from DB
const {db} = require('../server/index');
const multer = require(`multer`); //Used to insert files

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

//POST
const postGame = (req,res)=>{
    const {name, description, publisher, price} = req.body;
    //Body
    const singleplayer = req.body.singleplayer === 'on' ? true : false;
    const multiplayer = req.body.multiplayer === 'on' ? true : false;
    const open_world = req.body.open_world === 'on' ? true : false;
    const sandbox = req.body.sandbox === 'on' ? true : false;
    const simulator = req.body.simulator === 'on' ? true : false;
    const teambased = req.body.team_based === 'on' ? true : false;
    const fps = req.body.fps === 'on' ? true : false;
    const horror = req.body.horror === 'on' ? true : false;
    const puzzle = req.body.puzzle === 'on' ? true : false;
    const other = req.body.other === 'on' ? true : false;

    //TODO: prefix the 5 uploaded image with ID_* where ID is in the mysql database column id.
    //We will upload it to public/upload
    
}

//PUT
const putGame = (req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(403).send('No ID supplied');
    }
}

//DELETE
const deleteGame = (req,res)=>{
    const {id} = req.params;
}

module.exports = {
    getGame,
    postGame,
    putGame,
    deleteGame
}