//GET
const getGame = (req,res)=>{
    res.send('Hello WORLD')
}

//POST
const postGame = (req,res)=>{

}

//PUT
const putGame = (req,res)=>{
    const {id} = req.params;
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