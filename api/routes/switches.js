const express = require('express');
const router = express.Router();

const Switch = require('../Models/switch');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Switch.find()
    .select('switchName switchId switchGenericName switchIcon switchStatus deviceId')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            switches: docs
        };
        console.log(response);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: err});
    });
});

router.post('/', (req, res, next) => {
    const switchData = new Switch({
        _id: new mongoose.Types.ObjectId(),
        auth: req.body.auth,
        deviceId: req.body.deviceId,
        hostName: req.body.hostName,
        switchGenericName: req.body.switchGenericName,
        switchIcon: req.body.switchIcon,
        switchId: req.body.switchId,
        switchName: req.body.switchName,
        switchStatus: req.body.switchStatus
    });
    switchData.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "Added Switch Successfully",
            createdProduct: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:switchId', (req, res, next) => {
    const id = req.params.switchId;
    Switch.findOne({switchId: id}).then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: "No Switch Found"});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    // Switch.findById(id).exec().then(doc => {
    //     console.log(doc);
    //     res.status(200).json(doc);

    // }).catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //         error: err
    //     })
    // });
});

router.patch('/:switchId', (req, res, next)=>{
    const id = req.params.switchId;
    // router.get('/:switchId', (req, res, next)=>{
        Switch.findOne({switchId: id}).then(doc => {
            console.log(doc);
            if(doc){
                console.log(doc['switchStatus']);
                
                if(doc['switchStatus'] === "0"){
                    console.log(req.body.on);
                    const statusOn = req.body.on;
                    Switch.updateOne({switchId: id}, {$set: {switchStatus: statusOn}})
                    .exec()
                    .then(result =>{
                        console.log(result);
                        Switch.findOne({switchId: id})
                            .then(doc => {
                            res.status(200).json(doc);
                        })
                        .catch(err => {
                            res.status(500).json({message: err});
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                    });
                    console.log('switch Off');
                    return;
                }
                else{
                    console.log(req.body.off);
                    const statusOff = req.body.off;
                    Switch.updateOne({switchId: id}, {$set: {switchStatus: statusOff}})
                    .exec()
                    .then(result =>{
                        console.log(result);
                        Switch.findOne({switchId: id})
                            .then(doc => {
                            res.status(200).json(doc);
                        })
                        .catch(err => {
                            res.status(500).json({message: err});
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                    });
                    console.log('switch ON');
                    return;
                }

            }else{
                res.status(404).json({message: "No Switch Found"});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    // });

});

router.delete('/:switchId', (req, res, next)=>{
    const switchId = req.params.switchId;
    Switch.remove({switchId: switchId})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: err});
    });
});

module.exports = router;