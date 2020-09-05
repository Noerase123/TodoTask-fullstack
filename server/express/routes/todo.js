const express = require('express');
const router = express.Router();
const todoModel = require('../model/todoModel')

//add item
router.post('/', (req,res,next) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hh = today.getHours()
    var ii = today.getMinutes()
    var ss = today.getSeconds()

    today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + ii + ':' + ss

    const item = new todoModel({
        title: req.body.title,
        listType: req.body.listType,
        container: "main",
        dateCreated: today
    })

    item.save()
        .then(response => {
            res.status(201).json({
                message: 'todo list has been added',
                listID: response._id
            })
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
})

//add item to another item
router.post('/:id', (req,res,next) => {
    const id = req.params.id

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hh = today.getHours()
    var ii = today.getMinutes()
    var ss = today.getSeconds()

    today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + ii + ':' + ss

    const item = new todoModel({
        title: req.body.title,
        listType: req.body.listType,
        container: id,
        dateCreated: today
    })

    item.save()
        .then(response => {
            res.status(201).json({
                message: 'todo list has been added',
                listID: response._id
            })
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
})

// get all items
router.get('/', async (req,res,next) => {
    const all = await todoModel.find({container: "main"})

    try {
        const getAll = all.map(app => {
            
            return {
                _id: app._id,
                title: app.title,
                listType: app.listType,
                container: app.container,
                dateCreated: app.dateCreated
            }
        })
        res.status(200).json({
            data: getAll
        })

    } catch(err) {
        res.status(500).json({error: err})
        console.log(JSON.parse(err))
    }
})

router.get('/:id', async (req,res,next) => {
    const itemID = req.params.id

    const item = await todoModel.findOne({_id: itemID})

    const containItem = await todoModel.find({container:itemID})

    try {

        const itemWithinContainer = containItem.map(app => {
            return {
                _id: app._id,
                title: app.title,
                listType: app.listType,
                container: app.container,
                dateCreated: app.dateCreated
            }
        })

        res.status(200).json({
            item: item,
            data: itemWithinContainer
        })
    } catch(err) {
        res.status(500).json({error:err})
    }
    
})

router.patch('/:id', async (req,res,next) => {
    const id = req.params.id

    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await todoModel.update({_id:id},{$set: updateOps})
    try{
        res.status(200).json({
            message: 'todo list updated',
            listID: id
        })
    } catch (err) {
        res.status(500).json({error:err})
    }
})

router.delete('/:id', async (req,res,next) => {
    const id = req.params.id
    await todoModel.deleteOne({_id: id})
    await todoModel.deleteOne({container: id})
    
    try {
        res.status(200).json({
            message: `(${id}) list deleted`
        })
    } catch(err) {
        res.status(500).json({error:err})
    }
})


module.exports = router;
