const express =  require('express');
const router = express.Router();
const ItemContext = require('../../Datastore/TaskModel')
const _TaskDomain = require('../../Domain/TaskDomain')
const TaskDomain = new _TaskDomain(ItemContext)
const TaskServices = require('../../Services/TaskServices')

router.post('/', async(req, res) =>{
    try{
        let result = await TaskServices.createTaskAsync(req) 
        if(result.IsSuccess){
            res.status(200).send(result.Item)
        }else{
            console.log(result)
            res.status(400).send(result.Errors)
        }
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
})

router.get('/status', async(req,res) =>{
    try{

        let Items = await TaskServices.GetTasksByUserIdAndStatusAsync(req)

        res.status(200).send(Items)

    }catch(exception){
        res.status(500).send(exception)
    }
})


router.get('/', async(req,res) =>{
    try{

        let Items = await TaskServices.GetTasksByUserIdAsync(req)

        res.status(200).send(Items)


    }catch(exception){
        res.status(500).send(exception)
    }
})

router.delete('/:id',async(req,res) => {
    try{

        let delResponse = await TaskDomain.DeleteTaskAsync(req.params.id)

        if(delResponse){
            res.status(200).send(req.params.id)
        }else{
            res.status(400).send()
        }
    }catch(exception){
        res.status(500).send(exception)
    }

})

router.put('/:taskId', async(req, res) =>{
    try{
        let result = await TaskDomain.UpdateTaskAsync(req.params.taskId,req.body) 
        if(result.IsSuccess){
            res.status(200).send(result.Item)
        }else{
            console.log(result)
            res.status(400).send(result.Errors)
        }
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
})



module.exports = router
