const express =  require('express');
const router = express.Router();
const UserServices = require('../../Services/UserServices')


router.post('/', async(req, res) =>{
    try{
        let result = await UserServices.AddUserAsync(req.body) 
        if(result.Token){
            res.status(200).send(result.Token)
        }else{
            res.status(400).send()
        }
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
})


router.get('/:id', async(req, res) =>{
    try{
        let result = await UserServices.GetUserTokenAsync(req.params.id)
        if(result.Token){
            res.status(200).send(result.Token)
        }else{
            res.status(400).send()
        }
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
})



module.exports = router