const express = require('express');
const router = express.Router();

const Switch = require('../Models/switch');
const mongoose = require('mongoose');
const { response } = require('../../app');


router.get('/', (req, res, next) => {
    Switch.find()
        .select('switchName switchId switchStatus hostName auth switchGenericName switchIcon deviceId userId room')
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
            res.status(500).json({ message: err });
        });
});

router.post('/', (req, res, next) => {
    const switchData = new Switch({
        _id: new mongoose.Types.ObjectId(),
        // auth: req.body.auth,
        deviceId: req.body.deviceId,
        userId: req.body.userId,
        room: req.body.room,
        // hostName: req.body.hostName,
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
    Switch.findOne({ switchId: id })
    .select('switchName switchId switchStatus hostName auth switchGenericName switchIcon deviceId')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: "No Switch Found" });
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

router.get('/deviceId/:deviceId', (req, res, next) => {
    const id = req.params.deviceId;
    Switch.where({deviceId: id})
    .select('switchName switchId switchStatus hostName auth switchGenericName switchIcon deviceId')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            switches: docs
        };
        res.status(200).json(response);
        console.log(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
        console.log(err);
    });
});

router.get('/getDeviceStatus/:switchGenericName', (req, res, next)=>{
    const genericName = req.params.switchGenericName;
    Switch.findOne({switchGenericName: genericName})
    .select('switchStatus')
    .exec()
    .then(doc => {
        res.status(200).json(doc['switchStatus']);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/on/:switchId', (req, res, next) => {
    const id = req.params.switchId;
    changeSwitchStatus("1", id, res);
});

router.patch('/off/:switchId', (req, res, next) => {
    const id = req.params.switchId;
    changeSwitchStatus("0", id, res);
});

router.patch('/switchName/on/:switchName', (req, res, next) => {
    const switchName = req.params.switchName;
    changeSwitchStatusByName("1", switchName, res);
});

router.patch('/switchName/off/:switchName', (req, res, next) => {
    const switchName = req.params.switchName;
    changeSwitchStatusByName("0", switchName, res);
});

router.patch('/byId/on/:id', (req, res, next) => {
    const id = req.params.id;
    changeSwitchStatusById("1", id, res);
});

router.patch('/byId/off/:id', (req, res, next) => {
    const id = req.params.id;
    changeSwitchStatusById("0", id, res);
});

router.patch('/changeName/:switchId', (req, res, next) => {
    const id = req.params.switchId;
    const newName = req.body.newName;
    changeSwitchName(newName, id, res);
});

router.patch('/changeName/bySwitchName/:switchName', (req, res, next) => {
    const switchName = req.params.switchName;
    const newName = req.body.newName;
    changeSwitchNameBySwitchName(newName, switchName, res);
});

router.patch('/changeIcon/:switchId', (req, res, next) => {
    const id = req.params.switchId;
    const newIconName = req.body.newIconName;
    changeSwitchIcon(newIconName, id, res);
});

function changeSwitchIcon(newIconName, id, res){
    Switch.updateOne({ switchId: id }, { $set: { "switchIcon": newIconName } })
        .exec()
        .then(result => {
            console.log(result);
            Switch.findOne({ switchId: id })
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            console.log(err);
        });
}


function changeSwitchName(newName, id, res){
    Switch.updateOne({ switchId: id }, { $set: { "switchName": newName } })
        .exec()
        .then(result => {
            console.log(result);
            Switch.findOne({ switchId: id })
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            console.log(err);
        });
}

function changeSwitchNameBySwitchName(newName, switchName, res){
    Switch.updateOne({ switchName: switchName }, { $set: { "switchName": newName } })
        .exec()
        .then(result => {
            console.log(result);
            Switch.findOne({ switchName: newName })
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            console.log(err);
        });
}

function changeSwitchStatus(newStatus, id, res){
    Switch.updateOne({ switchId: id }, { $set: { switchStatus: newStatus } })
        .exec()
        .then(result => {
            console.log(result);
            Switch.findOne({ switchId: id })
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            console.log(err);
        });

}

function changeSwitchStatusByName(newStatus, name, res){
    Switch.updateOne({ switchName: name }, { $set: { switchStatus: newStatus } })
        .exec()
        .then(result => {
            console.log(result);
            Switch.findOne({ switchName: name })
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            console.log(err);
        });

}

function changeSwitchStatusById(newStatus, id, res){
    Switch.updateOne({ _id: id }, { $set: { switchStatus: newStatus } })
        .exec()
        .then(result => {
            console.log(result);
            Switch.findOne({ _id: id })
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            console.log(err);
        });

}

router.patch('/toggle/:switchId', (req, res, next) => {
    const id = req.params.switchId;
    Switch.findOne({ switchId: id }).then(doc => {
        console.log(doc);
        if (doc) {
            console.log(doc['switchStatus']);

            if (doc['switchStatus'] === "0") {
                console.log(req.body.on);
                const statusOn = req.body.on;
                changeSwitchStatus(statusOn, id, res);
                console.log('switch Off');
                return;
            }
            else {
                console.log(req.body.off);
                const statusOff = req.body.off;
                changeSwitchStatus(statusOff, id, res);
                console.log('switch ON');
                return;
            }

        } else {
            res.status(404).json({ message: "No Switch Found" });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});

router.delete('/:switchId', (req, res, next) => {
    const switchId = req.params.switchId;
    Switch.remove({ switchId: switchId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err });
        });
});

const connection = mongoose.connection;

connection.once("open", ()=>{
    const switchesStream = connection.collection('switches').watch();
    switchesStream.on('change', (change)=>{
        console.log('recording Change');
        console.log(change.operationType);
    });
});

module.exports = router;