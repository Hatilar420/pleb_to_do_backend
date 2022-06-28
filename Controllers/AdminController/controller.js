const express =  require('express');
const router = express.Router();
const TaskServices = require('../../Services/TaskServices')

router.get('/', async(req,res) =>{
    try{
        let Items = await TaskServices.GetAllUsersTasks()
        res.status(200).send(Items)
    }catch(exception){
        res.status(500).send(exception)
    }
})

module.exports = router