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